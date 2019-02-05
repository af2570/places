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
    padding: 10,
    paddingTop: 70,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 2
    }
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
    backgroundColor: '#bbb',
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
