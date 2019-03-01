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
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: utils.normalize(70)
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.white,
    flexDirection: 'row',
    paddingBottom: Platform.select({
      ios: utils.normalize(15),
      android: utils.normalize(7)
    }),
    margin: utils.normalize(15)
  },
  input: {
    color: colors.white,
    paddingLeft: utils.normalize(35),
    flex: 1
  },
  inputIcon: {
    position: 'absolute',
    alignSelf: 'center',
    paddingBottom: Platform.select({
      ios: utils.normalize(18),
      android: utils.normalize(10)
    })
  },
  loginButton: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: utils.normalize(50),
    margin: utils.normalize(15)
  },
  loginButtonText: {
    color: colors.main,
    fontSize: utils.normalize(15)
  }
})
