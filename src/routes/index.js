import { StackNavigator, SwitchNavigator } from 'react-navigation'

import AuthRoutes from './auth'
import AppRoutes from './app'

import { Splash } from '../screens'

const AuthStack = StackNavigator(AuthRoutes)
const AppStack = StackNavigator(AppRoutes)

const Router = SwitchNavigator({
  Splash,
  Auth: AuthStack,
  App: AppStack
})

export default Router
