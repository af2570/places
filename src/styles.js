import { StyleSheet, Dimensions, PixelRatio } from 'react-native'


export const colors = {
  light: '#F5F8F7',
  lightAccent: '#888990',
  main: '#F5AA4C',
  darkAccent: '#A6534B',
  dark: '#363134',
  white: '#fff',
  black: '#000',
  greyscale: {
    black: '#000',
    dark: '#131313',
    darkGrey: '#2D2B2A',
    grey: '#423F3A',
    mediumLightGrey: '#696662',
    lightGrey: '#888990',
    light: '#A8A8A8',
    smoke: '#D5D4D4',
    ghost: '#E2E2E2',
    eggshell: '#F6F6F6',
    white: '#fff'
  }
}

export const shared = {
  main: {
    flex: 1
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: colors.main,
    borderBottomWidth: 0,
    elevation: 0
  },
  headerTintColor: colors.white
}

export const utils = {
  normalize: size => {
    const scale = Dimensions.get('window').width / 375 // based on iPhone X's width
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  },
  normalizeByHeight: size => {
    const scale = Dimensions.get('window').height / 812 // based on iPhone X's height
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
}