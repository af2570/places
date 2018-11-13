import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { View, Text } from 'react-native'

import client from './lib/apollo'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // TODO add routes
    return (
      <View>
        <Text>App</Text>
      </View>
    )
  }
}

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

export default AppWithApollo
