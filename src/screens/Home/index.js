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

    let region = null

    if (props.screenProps.location) {
      region = {
        latitude: props.screenProps.location.latitude,
        longitude: props.screenProps.location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    }

    this.state = {
      searchText: '',
      region
    }
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

  onPressLocation = (e) => {
    const {
      coordinate,
      position,
      placeId,
      name
    } = e.nativeEvent
    this.refs.search.blur()
    console.log('Press location', { coordinate, position, placeId, name })
  }

  onRegionChange = (region) => {
    console.log('Change region', region)
    this.setState({ region })
  }

  render = () => {
    console.log(this.refs)
    // TODO: blur searchbar on click away (click map view)
    // TODO: get geolocation & set initial location for map

    const { searchText, region } = this.state

    return (
      <View style={styles.main}>
        <MapView
          initialRegion={region}
          ref='mapview'
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsIndoors={false}
          showsTraffic={false}
          showsBuildings={false}
          pitchEnabled={false}
          toolbarEnabled={false}
          showsUserLocation={true}
          onPress={this.onPressLocation}
          onPoiClick={this.onPressLocation}
          onRegionChange={() => this.refs.search.blur()}
          onRegionChangeComplete={this.onRegionChange}
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
