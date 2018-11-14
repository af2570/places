import { StackNavigator, SwitchNavigator } from 'react-navigation'

import AuthRoutes from './auth'

const AuthStack = StackNavigator(AuthRoutes)

const Router = SwitchNavigator({
  Auth: AuthStack
})

export default Router
