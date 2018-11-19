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

    console.log(props)

    this.state = {
      searchText: '',
      region: null
    }

  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
        })
      },
      error => {
        console.log('Error getting location: ', error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  onChangeSearchText = (text) => {
    this.setState({ searchText: text })
    // this.typingTimer = setTimeout(() => this.onFinishedTyping(), this.typingTimeout)
  }

  onSubmitSearchText = () => {
    let { searchText } = this.state
    // TODO: query for locations using search text
    console.log('SEARCH: ', searchText)
  }

  toggleMenu = () => {
    // TODO: implement menu (with logout option)
    this.refs.search.blur()
    this.props.navigation.openDrawer()
    console.log('Toggle menu')
  }

  onPressLocation = ({ coordinate, position, placeId, name }) => {
    this.refs.search.blur()
    console.log('Press location', { coordinate, position })
  }

  render = () => {
    // TODO: blur searchbar on click away (click map view)
    // TODO: get geolocation & set initial location for map

    const { searchText, region } = this.state

    return (
      <View style={styles.main}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsIndoors={false}
          showsTraffic={false}
          showsBuildings={false}
          showsUserLocation={true}
          onPress={this.onPressLocation}
          onPoiClick={this.onPressLocation}
          region={region}
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
            ref='search'
            placeholder='Search'
            value={searchText}
            onChangeText={this.onChangeSearchText}
            onSubmitEditing={this.onSubmitSearchText}
            autoCorrect={false}
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
