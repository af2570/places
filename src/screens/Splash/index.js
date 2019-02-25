import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import { Logo } from '../../images'

import { compose } from 'recompose'
import { withNav } from '../../../lib/recompose'

import { graphql } from 'react-apollo'
import { SplashQuery } from './queries'

import styles from './styles'

class Splash extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = () => {
    const { loading, error, viewer } = this.props.data

    if (loading || error) return

    if (!viewer) {
      this.props.navigate('Login')
    } else {
      this.props.navigate('MapSearch')
    }
  }

  render = () => {
    return (
      <View style={styles.main}>
        <Image
          key='splashLogo'
          resizeMode='contain'
          style={styles.logo}
          source={Logo}
        />
      </View>
    )
  }
}

const enhance = compose(
  withNav,
  graphql(SplashQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)

export default enhance(Splash)
