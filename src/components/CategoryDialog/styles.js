import {
  StyleSheet,
  Platform
} from 'react-native'
import { colors } from '../../styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  body: {
    flex: 1
  },
  wrappedList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
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
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 10
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: colors.lightAccent,
    flexDirection: 'row',
    paddingBottom: Platform.select({
      ios: 15,
      android: 7
    })
  },
  input: {
    color: colors.lightAccent,
    flex: 1
  }
})
