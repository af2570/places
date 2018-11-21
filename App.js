import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { View, Text, AppState } from 'react-native'

import Navigator from './src/routes'

import client from './lib/apollo'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount = () => {

    const successCb = position => {
      this.setState({
        location: position.coords
      })
    }

    const errorCb = error => {
      console.log('Error getting location: ', error)
    }

    const geoConfig = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }

    navigator.geolocation.getCurrentPosition(successCb, errorCb, geoConfig)
    navigator.geolocation.watchPosition(successCb, errorCb, geoConfig)
  }

  componentWillUnmount = () => {
    navigator.geolocation.stopObserving()
  }

  render = () => {
    // TODO add routes
    return (
      <ApolloProvider client={client}>
          <View style={{ flex: 1 }}>
            <Navigator
              screenProps={{
                location: this.state.location
              }}
            />
          </View>
      </ApolloProvider>
    )
  }
}

export default App
