import {
  StyleSheet,
  Platform
} from 'react-native'
import { shared, colors } from '../../styles'

export default StyleSheet.create({
  main: {
    ...shared.main
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 70,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
  },
  searchButton: {
    padding: 10,
    marginRight: 10
  },
  search: {
    flex: 1,
    color: colors.dark
  }
})
