import React from 'react'
import { Icon } from 'react-native-elements'

import { 
  MapSearch, 
  PlaceInfo,
  Users
} from '../screens'

import { colors } from '../styles'

export const MapRoutes = {
  MapSearch: {
    route: 'MapSearch',
    screen: MapSearch,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  },
  PlaceInfo: {
    route: 'PlaceInfo',
    screen: PlaceInfo,
    navigationOptions: {
      tabBarVisible: false,
      header: null
    }
  }
}

export const UserRoutes = {
  Users: {
    route: 'Users',
    screen: Users,
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
}
