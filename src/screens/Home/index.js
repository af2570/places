import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { compose } from 'recompose'
import { withNav, withAuth } from '../../../lib/recompose'
import LocalStorage from '../../../lib/LocalStorage'

import { colors } from '../../styles'
import styles from './styles'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: ''
    }

    this.typingTimer;
    this.typingTimeout = 500;
  }

  onChangeSearchText = (text) => {
    clearTimeout(this.typingTimer)
    this.setState({ searchText: text })
    this.typingTimer = setTimeout(() => this.onFinishedTyping(), this.typingTimeout)
  }

  onSubmitSearchText = () => {
    clearTimeout(this.typingTimer)
    this.onFinishedTyping()
  }

  onFinishedTyping = () => {
    let { searchText } = this.state
    // TODO: query for locations using search text
    console.log('SEARCH: ', searchText)
  }

  toggleMenu = () => {
    // TODO: implement menu (with logout option)
    console.log('Toggle menu')
  }

  render = () => {
    // TODO: blur searchbar on click away (click map view)

    // TODO: get geolocation & set initial location for map

    const { searchText } = this.state
    return (
      <View style={styles.main}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >

        </MapView>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={this.toggleMenu}
            style={styles.searchButton}
          >
            <Icon name='menu' color={colors.dark} />
          </TouchableOpacity>
          <TextInput
            placeholder='Search'
            value={searchText}
            onChangeText={this.onChangeSearchText}
            onSubmitEditing={this.onSubmitSearchText}
            authoCorrect={false}
            autoCapitalize='none'
            style={styles.search}
            returnKeyType='search'
          />
        </View>
      </View>
    )
  }
}

const enhance = compose(
  withNav,
  withAuth
)

export default enhance(Home)
