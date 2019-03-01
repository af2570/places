import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    flex: 1
  },
  modal: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -2
    },
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.main
    backgroundColor: colors.white,
    padding: 2
  },
  body: {
    flex: 1
  }
})
