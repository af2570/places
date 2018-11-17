import {
  StyleSheet,
  Platform
} from 'react-native'
import { shared, colors } from '../../styles'

export default StyleSheet.create({
  main: {
    ...shared.main,
    backgroundColor: colors.main
  },
  logo: {
    marginBottom: 100,
    marginTop: Platform.select({
      ios: 200,
      android: 160
    }),
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
