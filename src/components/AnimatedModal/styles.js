import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

export default new StyleSheet.create({
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
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.main
  },
  headerIcon: {
    padding: 7
  },
  headerText: {
    padding: 7,
    color: '#fff',
    textAlign: 'center'
  },
  body: {
    flex: 1
  }
})
