import { StyleSheet } from 'react-native'
import { colors } from '../../styles'

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  safeAreaView: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  dialog: {
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerIcon: {
    padding: 7
  },
  headerText: {
    padding: 7,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
