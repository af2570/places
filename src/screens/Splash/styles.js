import {
  StyleSheet,
  Platform
} from 'react-native'
import { shared, colors, utils } from '../../styles'

export default StyleSheet.create({
  main: {
    ...shared.main,
    backgroundColor: colors.main
  },
  logo: {
    marginBottom: utils.normalizeByHeight(100),
    marginTop: Platform.select({
      ios: utils.normalizeByHeight(200),
      android: utils.normalizeByHeight(160)
    }),
    width: utils.normalize(200),
    height: utils.normalize(200),
    alignSelf: 'center'
  }
})
