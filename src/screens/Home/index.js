import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native'
import { Icon } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { AnimatedModal } from '../../components'

import { compose, withStateHandlers } from 'recompose'
import { withNav, withAuth } from '../../../lib/recompose'

import { graphql } from 'react-apollo'
import { SearchPlaces } from './queries'

import { colors } from '../../styles'
import styles from './styles'

import { DEFAULT_LOCATION } from '../../../lib/constants'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      highlighted: null,
      searchBg: new Animated.Value(0)
    }
  }

  turnOnSearchBg = () => {
    Animated.timing(this.state.searchBg, {
      toValue: 150,
      duration: 400
    }).start()
  }

  turnOffSearchBg = () => {
    Animated.timing(this.state.searchBg, {
      toValue: 0,
      duration: 400
    }).start()
  }

  toggleMenu = () => {
    // TODO: implement menu (with logout option)
    this.refs.search.blur()
    this.props.navigation.openDrawer()
  }

  clearSearch = () => {
    this.refs.modal.close()
    this.setState({ searchText: '' })
    this.props.setKeyword('')
  }

  onFocusSearchBar = () => {
    this.refs.modal.close()
  }

  onChangeSearchText = (text) => {
    this.setState({ searchText: text })
  }

  onSubmitSearchText = () => {
    let { searchText } = this.state
    this.props.setKeyword(searchText)

    if (searchText) {
      this.refs.modal.open()
    }
  }

  onPressLocation = (place) => (e) => {
    const {
      coordinate,
      position,
      placeId,
      name
    } = e.nativeEvent
    this.refs.search.blur()
    console.log('Press location', { coordinate, position, placeId, name })
  }

  onPressSearchResult = (place) => {
    console.log('Pressed place in list: ', place)
  }

  onRegionChange = (region) => {
    console.log('Change region', region, this.refs.mapview)

    this.props.setRegion(region)
  }

  onPressSearchMarker = (place) => {
    console.log('Pressed place: ', place)
    this.setState({ highlighted: place.id })
    // TODO: some way to add location to list
  }

  _renderSearchMarkers = () => {
    if (
      !this.props.data ||
      this.props.data.loading ||
      this.props.data.error ||
      !this.props.data.places
    ) {
      return null
    }

    return this.props.data.places.map(
      (place, i) => (
        <Marker
          key={i}
          // image={Pin}
          coordinate={{
            latitude: place.location.lat,
            longitude: place.location.lng
          }}
          flat={true}
          onPress={_ => this.onPressSearchMarker(place)}
        >
          <View
            style={{
              backgroundColor: 'red',
              height: 10,
              width: 10,
              borderRadius: 10
            }}
          />
        </Marker>
      )
    )
  }

  _renderSearchResult = ({ item, index }) => {
    // TODO: make this a swipeable component

    return (
      <TouchableOpacity style={styles.row} onPress={_ => this.onPressSearchResult(item)}>
        <Text style={styles.rowTitle}>
          {index + 1}. {item.name}
        </Text>
        <Text style={styles.rowSubtitle}>
          {item.address}
        </Text>
        
        {item.added &&
          <View style={styles.rowLine}>
            <Icon name='person-pin' size={20} color={colors.lightAccent} />
            <Text style={styles.rowText}>
              You have saved this location
            </Text>
          </View>
        }
      </TouchableOpacity>
    )
  }

  _renderSearchResultList = () => {

    if (
      !this.props.data ||
      this.props.data.error ||
      !this.props.data.places
    ) {
      return null
    }

    // TODO: react-native-snap-carousel to display search result list: (https://www.npmjs.com/package/react-native-snap-carousel)
    // At the end of the list, have an option to "view all" - where limit will be greater

    return (
      <FlatList
        data={this.props.data.places}
        keyExtractor={item => item.id}
        renderItem={this._renderSearchResult}
        ItemSeparatorComponent={_ => (
          <View style={styles.divider} />
        )}
        ListEmptyComponent={_ => (
          <View style={styles.emptyList}>
            <Text>No results</Text>
          </View>
        )}
      />
    )

  }

  _renderSearchButton = () => {
    let { keyword } = this.props

    let icon, action

    if (keyword) {
      icon = 'arrow-back'
      action = this.clearSearch
    } else {
      icon = 'menu'
      action = this.toggleMenu
    }

    return (
      <TouchableOpacity style={styles.searchButton} onPress={action}>
        <Icon name={icon} color={colors.dark} />
      </TouchableOpacity>
    )
  }

  render = () => {
    // TODO: Option to "Redo Search in Area"

    const { searchText, searchBg } = this.state
    const { region } = this.props

    const searchBgColor = searchBg.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
    })

    const searchBorderWidth = searchBg.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1]
    })

    const searchShadowOpacity = searchBg.interpolate({
      inputRange: [0, 150],
      outputRange: [0.2, 0]
    })

    const searchBgShadowOpacity = searchBg.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 0.2]
    })

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
          // onRegionChange={_ => this.refs.search.blur()}
          onRegionChangeComplete={this.onRegionChange}
        >
          {this._renderSearchMarkers()}
        </MapView>
        <AnimatedModal 
          ref='modal'
          scrollable 
          onClose={this.turnOffSearchBg}
          onOpen={this.turnOnSearchBg}
        >
          {this._renderSearchResultList()}
        </AnimatedModal>
        <Animated.View 
          style={[
            styles.searchContainer, 
            { 
              shadowOpacity: searchBgShadowOpacity,
              backgroundColor: searchBgColor 
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.searchBar,
              {
                shadowOpacity: searchShadowOpacity,
                borderWidth: searchBorderWidth
              }
            ]}
          >
            {this._renderSearchButton()}
            <TextInput
              ref='search'
              placeholder='Search'
              value={searchText}
              onChangeText={this.onChangeSearchText}
              onSubmitEditing={this.onSubmitSearchText}
              onFocus={this.onFocusSearchBar}
              autoCorrect={false}
              clearButtonMode='always'
              autoCapitalize='none'
              style={styles.search}
              returnKeyType='search'
            />
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const enhance = compose(
  withNav,
  withAuth,
  withStateHandlers(
    ({ navigation, screenProps }) => {

      let { latitude, longitude } = screenProps.location || DEFAULT_LOCATION
      let latitudeDelta = 0.1
      let longitudeDelta = 0.1

      // If we've passed in the center coordinate for the map in nav params
      if (
        navigation.state.params &&
        navigation.state.params.latitude &&
        navigation.state.params.longitude
      ) {
        latitude = navigation.state.params.latitude
        longitude = navigation.state.params.longitude

        if (
          navigation.state.params.latitudeDelta &&
          navigation.state.params.longitudeDelta &&
          navigation.state.params.latitudeDelta > 0 &&
          navigation.state.params.longitudeDelta > 0
        ) {
          latitudeDelta = navigation.state.params.latitudeDelta
          longitudeDelta = navigation.state.params.longitudeDelta
        }
      }

      return {
        region: {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        },
        location: {
          lat: latitude,
          lng: longitude
        },
        keyword: ''
      }
    },
    {
      setRegion: () => (region) => ({ region }),
      redoSearchInArea: ({ region }) => () => ({
        location: {
          lat: region.latitude,
          lng: region.longitude
        }
      }),
      setKeyword: ({ region, location }) => (keyword) => ({
        keyword,
        location: {
          lat: keyword ? region.latitude : location.lat,
          lng: keyword ? region.longitude : location.lng
        }
      })
    }
  ),
  graphql(SearchPlaces, {
    options: props => ({
      fetchPolicy: 'network-only',
      onCompleted: data => console.log('QUERY COMPLETE: ', data),
      variables: {
        skip: !props.keyword,
        keyword: props.keyword,
        location: props.location
      }
    })
  })
)

export default enhance(Home)
