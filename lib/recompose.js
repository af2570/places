import {
  lifecycle,
  withProps
} from 'recompose'
import LocalStorage from './LocalStorage'

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
  componentDidMount: async () => {
    try {
      await LocalStorage.init()
      const token = LocalStorage.getItem('places_access_token')

      if (!token) {
        this.props.navigation.navigate({
          routeName: 'Login',
          key: 'Login'
        })
      }
    } catch (err) {
      console.log('Error in componentDidMount: ', err)
    }
  }
})
