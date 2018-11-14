import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { RetryLink } from 'apollo-link-retry'
import LocalStorage from './LocalStorage'
import { GRAPHQL_ENDPOINT } from '../config/env.config.js'

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    if (error.statusCode < 502) {
      return false
    }

    return !!error && operation.operationName !== 'specialCase'
  },
  delay: (count, operation, error) => {
    return count * 1000 * Math.random()
  }
})

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'same-origin'
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const { headers } = context.response

    if (headers) {
      const logout = headers.get('logout')
      if (logout) {
        LocalStorage.removeItem('places_access_token')
      }
    }
    return response
  })
})

const middlewareLink = setContext(() => {
  return new Promise(async(resolve, reject) => {
    try {
      // TODO: get places_access_token fromo localstorage and return headers
      await LocalStorage.init()

      const headers = {
        places_token: LocalStorage.getItem('places_access_token')
      }

      resolve({ headers })
    } catch (err) {
      reject(err)
    }
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const link = ApolloLink.from([
  retryLink,
  errorLink,
  middlewareLink,
  afterwareLink,
  httpLink
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
