import { Users } from '../../screens'

import { shared } from '../../styles'

export default {
  Users: {
    route: 'Users',
    screen: Users,
    navigationOptions: {
      gesturesEnabled: false,
      headerForceInset: true,
      headerTitle: 'Users',
      headerStyle: shared.header,
      headerTintColor: shared.headerTintColor
    }
  }
}