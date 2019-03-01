import {
  MapSearch,
  PlaceInfo
} from '../../screens'

import { shared } from '../../styles'

export default {
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
    navigationOptions: props => ({
      headerForceInset: true,
      headerTitle: props.navigation.getParam('name') || '',
      headerStyle: shared.header,
      headerTintColor: shared.headerTintColor
    })
  }
}