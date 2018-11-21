import React from 'react'
import { View } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'

import AuthRoutes from './auth'
import AppRoutes from './app'

import { Splash } from '../screens'
import { DrawerContentComponent } from '../components'
import { colors } from '../styles'

const AuthStack = createStackNavigator(AuthRoutes)

const AppStack = createDrawerNavigator(AppRoutes, {
  // drawerWidth: 100,
  contentComponent: DrawerContentComponent,
  drawerType: 'back',
  contentOptions: {
    activeTintColor: colors.dark,
    inactiveTintColor: colors.lightAccent,
    // activeBackgroundColor: colors.main
  }
})

const Router = createSwitchNavigator({
  Splash,
  Auth: AuthStack,
  App: AppStack
})

export default Router
