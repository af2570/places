import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import { colors, utils } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: utils.normalize(10)
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: utils.normalize(10)
  },
  headerText: {
    fontSize: utils.normalize(17),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  body: {
    flex: 1,
    paddingHorizontal: utils.normalize(10)
  },
  wrappedList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    height: utils.normalize(50),
    width: utils.normalize(50),
    borderRadius: utils.normalize(25),
    margin: utils.normalize(5)
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#fff'
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigIcon: {
    height: utils.normalize(60),
    width: utils.normalize(60),
    borderRadius: utils.normalize(30),
    marginBottom: utils.normalize(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.lightAccent,
    flexDirection: 'row',
    paddingBottom: Platform.select({
      ios: utils.normalize(15),
      android: utils.normalize(7)
    }),
    marginHorizontal: utils.normalize(10)
  },
  input: {
    color: colors.lightAccent,
    flex: 1
  }
})
