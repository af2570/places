import { StyleSheet } from 'react-native'

export const shared = {
  main: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export const colors = {
  light: '#F5F8F7',
  lightAccent: '#888990',
  main: '#F5AA4C',
  darkAccent: '#A6534B',
  dark: '#363134'
}
