import React from 'react'
import { Icon } from 'react-native-elements'

import { Home } from '../screens'

import { colors } from '../styles'

export default {
  Home: {
    route: 'Home',
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Map',
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          name='map'
          color={tintColor}
        />
      ),
      gesturesEnabled: false,
      header: null
    }
  }
}
