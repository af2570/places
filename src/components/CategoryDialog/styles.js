import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import { colors } from '../../styles'

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
    padding: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  body: {
    flex: 1,
    paddingHorizontal: 10
  },
  wrappedList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 5
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
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.lightAccent,
    flexDirection: 'row',
    paddingBottom: Platform.select({
      ios: 15,
      android: 7
    }),
    marginHorizontal: 10
  },
  input: {
    color: colors.lightAccent,
    flex: 1
  }
})
