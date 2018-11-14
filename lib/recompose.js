import {
  mapProps
} from 'recompose'

export const withNav = mapProps(
  props => ({
    ...props,
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
