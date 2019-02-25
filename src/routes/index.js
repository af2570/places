import React from 'react'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import { Icon } from 'react-native-elements'

import AuthRoutes from './auth'
import {
  MapRoutes,
  UserRoutes
} from './app'

import { Splash } from '../screens'
import { colors } from '../styles'

const AuthStack = createStackNavigator(AuthRoutes)

const MapStack = createStackNavigator(MapRoutes)
const UserStack = createStackNavigator(UserRoutes)

const AppTabStack = createBottomTabNavigator({
  Map: MapStack,
  Users: UserStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      let iconName
      switch (navigation.state.routeName) {
        case 'Map':
          iconName = 'map'
          break;
        case 'Users':
          iconName = 'people'
          break;
      }

      return (
        <Icon name={iconName} color={tintColor} />
      )
    }
  }),
  tabBarOptions: {
    showLabel: false,
    style: { padding: 10 },
    activeTintColor: colors.main,
    inactiveTintColor: colors.lightAccent
  }
})

const Router = createSwitchNavigator({
  Splash,
  Auth: AuthStack,
  App: AppTabStack
})

export default createAppContainer(Router)
