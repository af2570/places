import React from 'react'
import { View } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation'

import AuthRoutes from './auth'
import AppRoutes from './app'

import { Splash } from '../screens'

const AuthStack = createStackNavigator(AuthRoutes)

// TODO: try drawernavigator for app routes (built-in sidebar menu)
// createDrawerNavigator: https://reactnavigation.org/docs/en/drawer-navigator.html
// DrawerActions: https://reactnavigation.org/docs/en/drawer-actions.html
const DrawerContentComponent = (props) => (
  <View>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </View>
)

const AppStack = createDrawerNavigator(AppRoutes, {
  // drawerWidth: 100,
  contentComponent: DrawerContentComponent,
  drawerType: 'back'
})

const Router = createSwitchNavigator({
  Splash,
  Auth: AuthStack,
  App: AppStack
})

export default Router
