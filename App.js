import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { View, Text } from 'react-native'

import Navigator from './src/routes'

import client from './lib/apollo'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    // TODO add routes
    return (
      <ApolloProvider client={client}>
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      </ApolloProvider>
    )
  }
}

export default App
