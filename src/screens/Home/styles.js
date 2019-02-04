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
  },
  divider: {
    marginHorizontal: 10,
    height: 1,
    backgroundColor: colors.lightAccent,
    opacity: 0.7
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  alignRight: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  row: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  rowTitle: {
    marginBottom: 7,
    fontSize: 17,
    color: colors.dark,
    fontWeight: 'bold'
  },
  rowSubtitle: {
    marginBottom: 7,
    fontSize: 14,
    color: colors.lightAccent
  },
  rowLine: {
    flexDirection: 'row'
  },
  rowText: {
    fontSize: 14,
    color: colors.lightAccent
  }
})
