import { StyleSheet } from 'react-native'
import { shared, colors, utils } from '../../styles'

export default StyleSheet.create({
  main: {
    ...shared.main,
    backgroundColor: colors.greyscale.eggshell
  },
  loading: {
    ...shared.loading
  },
  // Top image
  topImageContainer: {
    position: 'relative',
    height: utils.normalizeByHeight(250),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noImageContainer: {
    height: utils.normalizeByHeight(150),
    backgroundColor: colors.main
  },
  topImage: {
    ...StyleSheet.absoluteFillObject
  },
  topImagePlaceholder: {
    height: utils.normalizeByHeight(150)
  },
  // Background
  accentBg: {
    backgroundColor: colors.main,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  // Header
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.greyscale.ghost,
    padding: utils.normalize(10),
    marginBottom: utils.normalize(15)
  },
  headerTitle: {
    color: colors.greyscale.dark,
    fontSize: utils.normalize(20),
    marginBottom: utils.normalize(5)
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  headerDescription: {
    color: colors.greyscale.mediumLightGrey,
    fontSize: utils.normalize(15)
  },
  bulletDivider: {
    color: colors.greyscale.grey,
    marginHorizontal: utils.normalize(5)
  },
  // Sections
  infoSection: {
    backgroundColor: colors.white,
    marginBottom: utils.normalize(15),
    padding: utils.normalize(10),
    borderColor: colors.greyscale.ghost,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  infoTitle: {
    fontSize: utils.normalize(18),
    color: colors.greyscale.dark,
    marginBottom: utils.normalize(5),
  },
  infoText: {
    fontSize: utils.normalize(15),
    color: colors.greyscale.dark
  },
  // Hours
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: utils.normalize(5)
  },
  weekday: {
    color: colors.greyscale.dark
  },
  // Text
  whiteText: {
    color: colors.white
  },
  accentText: {
    color: colors.main
  },
  // Buttons
  buttonRow: {
    flexDirection: 'row'
  },
  buttonInRow: {
    flex: 1
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: utils.normalize(10),
    paddingVertical: utils.normalize(15)
  },
  iconButtonText: {
    marginLeft: utils.normalize(5),
    fontSize: utils.normalize(15),
    fontWeight: 'bold'
  },

  // Dividers
  divider: {
    marginHorizontal: utils.normalize(15),
    height: 1,
    backgroundColor: colors.greyscale.smoke,
  },
  verticalDivider: {
    marginVertical: utils.normalize(10),
    width: 1,
    backgroundColor: colors.greyscale.smoke
  },
  whiteDivider: {
    backgroundColor: colors.white
  },
  // Helpers
  noBorder: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  noPadding: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  },
  noMargin: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  }
})