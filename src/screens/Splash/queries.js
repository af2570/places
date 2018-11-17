import gql from 'graphql-tag'

export const SplashQuery = gql`
  query viewer {
    viewer {
      id
      email
      first_name
      last_name
    }
  }
`
