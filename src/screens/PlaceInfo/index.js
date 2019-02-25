import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import { compose, withStateHandlers } from 'recompose'
import { withAuth, withNav } from '../../../lib/recompose'

import { graphql } from 'react-apollo'
import { PlaceQuery } from './queries'

import styles from './styles'

class PlaceInfo extends React.Component {
  constructor(props) {
    super(props)
    
  }

  addNote = _ => {
    console.log('addNote')
  }

  addToCollection = _ => {
    console.log('addToCollection')
  }

  _renderTopImage = _ => {
    const { data } = this.props
    if (!data || !data.place) return null

    if (!data.place.topImage) {
      return (
        <View style={styles.noImage}>
          {!data.loading && (
            <Icon
              name='md-images'
              type='ionicon'
              color='#fff'
            />
          )}
        </View>
      )
    }

    // TODO: multiple images
    return (
      <Image
        style={styles.topImage}
        source={{ uri: data.place.topImage.url }}
      />
    )
  }

  _renderHeader = _ => {
    const { data } = this.props
    if (!data || !data.place) return null

    const hasPrice = data.place.price && data.place.price.tier
    const hasCategory = data.place.categories && data.place.categories.length > 0

    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {data.place.name}
        </Text>
        <View style={styles.headerRow}>
          {hasPrice && (
            <Text style={styles.headerDescription}>
              {'$'.repeat(data.place.price.tier)}
            </Text>
          )}
          {hasPrice && hasCategory && (
            <Text style={styles.bulletDivider}>
              {'\u2022'}
            </Text>
          )}
          {hasCategory && (
            <Text style={styles.headerDescription}>
              {data.place.categories.map(item => item.pluralName).join(', ')}
            </Text>
          )}
        </View>
      </View>
    )
  }
  
  _renderDescription = _ => {
    const { data } = this.props
    if (
      !data || 
      !data.place ||
      !data.place.description
    ) return null

    return (
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Summary</Text>
        <Text style={styles.infoText}>
          {data.place.description}
        </Text>
      </View>
    )
  }

  _renderUserOptions = _ => {
    const { data } = this.props
    if (!data || !data.place) return null 

    return (
      <View style={[styles.infoSection, styles.accentBg]}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={this.addNote}
          >
            <Icon
              name='note-add'
              color='#fff'
            />
            <Text style={[styles.iconButtonText, styles.whiteText]}>
              Add a Note
            </Text>
          </TouchableOpacity>
          <View style={[styles.verticalDivider, styles.whiteDivider]} />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={this.addToCollection}
          >
            <Icon
              name='library-add'
              color='#fff'
            />
            <Text style={[styles.iconButtonText, styles.whiteText]}>
              Add to Collection
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderHours = _ => {
    const { data } = this.props
    if (
      !data ||
      !data.place ||
      !data.place.openHours ||
      !data.place.openHours.hours
    ) return null

    let days = []
    for (let i = 1; i <= 7; i++) {
      const hoursForDay = data.place.openHours.hours
        .find(item => (
          item.days &&
          item.days.includes(i) &&
          item.open &&
          item.open.length > 0
        ))

      let hours
      if (hoursForDay) {
        hours = hoursForDay.open.map(item => ({
          start: moment(item.start.replace('+', ''), 'HHmm').format('h:mm A'),
          end: moment(item.end.replace('+', ''), 'HHmm').format('h:mm A')
        }))
      }
            
      days.push({
        weekday: moment().isoWeekday(i),
        isToday: moment().isoWeekday() === i,
        hours
      })
    }

    return (
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Hours</Text>
        <FlatList
          data={days}
          keyExtractor={item => item.day}
          scrollEnabled={false}
          renderItem={({ item }) => {
            let weekdayStyle = [styles.weekday]
            let hourStyle = [styles.hour]

            if (item.isToday) {
              weekdayStyle.push(styles.today)
              hourStyle.push(styles.today)
            }

            if (!item.hours) {
              hourStyle.push(styles.mutedText)
            }
            return (
              <View style={styles.hourRow}>
                <Text style={weekdayStyle}>
                  {item.weekday}
                </Text>
                <View style={styles.hourContainer}>
                  {!item.hours && (
                    <Text style={hourStyle}>
                      Closed
                    </Text>
                  )}
                  {item.hours && item.hours.map(({ start, end }, i) => (
                    <Text key={i} style={hourStyle}>
                      {start} - {end}
                    </Text>
                  ))}
                </View>
              </View>
            )
          }}
        />
      </View>
    )
  }

  _renderContactInfo = _ => {
    return null
  }

  _renderLoading = _ => {
    if (this.props.data.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color='#fff' />
        </View>
      )
    }
  }

  render = _ => {
    return (
      <View style={styles.main}>
        <ScrollView>
          {this._renderTopImage()}
          <View style={styles.background}>
            {this._renderHeader()}
            {this._renderUserOptions()}
            {this._renderDescription()}
            {this._renderHours()}
            {this._renderContactInfo()}
          </View>
        </ScrollView>
        {this._renderLoading()}
      </View>
    )
  }
}

const enhance = compose(
  withAuth,
  withNav,
  withStateHandlers(
    ({ navigation, screenProps }) => ({
      id: navigation.getParam('id')
    }) 
  ),
  graphql(PlaceQuery, {
    options: props => ({
      fetchPolicy: 'network-only',
      onCompleted: data => console.log('QUERY COMPLETE: ', data),
      variables: {
        id: props.id
      }
    })
  })
)

export default enhance(PlaceInfo)