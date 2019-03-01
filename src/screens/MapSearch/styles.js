import { StyleSheet } from 'react-native'
import { shared, colors, utils } from '../../styles'

export default StyleSheet.create({
  main: {
    ...shared.main
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute', 
    top: 0,
    width: '100%',
    padding: utils.normalize(10),
    paddingTop: utils.normalizeByHeight(70),
    shadowRadius: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: utils.normalize(10),
    borderColor: colors.greyscale.smoke,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
  },
  searchButton: {
    padding: utils.normalize(10),
    marginRight: utils.normalize(10)
  },
  search: {
    flex: 1,
    color: colors.greyscale.dark
  },
  divider: {
    marginHorizontal: utils.normalize(10),
    height: 1,
    backgroundColor: colors.greyscale.smoke,
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
    padding: utils.normalize(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    marginRight: utils.normalize(10)
  },
  rowTitle: {
    marginBottom: utils.normalize(7),
    fontSize: utils.normalize(17),
    color: colors.greyscale.dark,
    fontWeight: 'bold'
  },
  rowSubtitle: {
    marginBottom: utils.normalize(7),
    fontSize: utils.normalize(14),
    color: colors.greyscale.grey
  },
  rowLine: {
    flexDirection: 'row'
  },
  rowText: {
    fontSize: utils.normalize(14),
    color: colors.greyscale.grey
  },
  searchMarker: {
    backgroundColor: 'red',
    height: utils.normalize(10),
    width: utils.normalize(10),
    borderRadius: utils.normalize(5)
  }
})
