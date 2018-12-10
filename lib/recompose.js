import {
  lifecycle,
  withProps,
  compose
} from 'recompose'
import LocalStorage from './LocalStorage'
import { ACCESS_TOKEN } from '../config/env.config.js'

export const withNav = withProps(
  props => ({
    back: () => props.navigation.goBack(),
    navigate: (route, params) => {
      props.navigation.navigate({
        routeName: route,
        key: route,
        params
      })
    }
  })
)

export const withAuth = lifecycle({
  async componentDidMount() {
    await LocalStorage.init()
    const token = LocalStorage.getItem(ACCESS_TOKEN)

    if (!token) {
      this.props.navigation.navigate({
        routeName: 'Login',
        key: 'Login'
      })
    }
  }
})
