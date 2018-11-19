import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import AuthRoutes from './auth'
import AppRoutes from './app'

import { Splash } from '../screens'

const AuthStack = createStackNavigator(AuthRoutes)
const AppStack = createStackNavigator(AppRoutes)

const Router = createSwitchNavigator({
  Splash,
  Auth: AuthStack,
  App: AppStack
})

export default Router
