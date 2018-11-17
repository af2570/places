import { StyleSheet } from 'react-native'

export const shared = {
  main: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // width: '100%',
    // height: '100%'
  }
}

export const colors = {
  light: '#F5F8F7',
  lightAccent: '#888990',
  main: '#F5AA4C',
  darkAccent: '#A6534B',
  dark: '#363134'
}
