import React, { Component } from 'react'
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'

import styles from './styles'

let deviceHeight = Dimensions.get('window').height

class AnimatedModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      animatedHeight: new Animated.Value(deviceHeight)
    }
  }

  animateModal = (height, cb = () => {}) => {
    Animated.timing(this.state.animatedHeight, {
      toValue: deviceHeight - height,
      duration: 400
    }).start(cb)
  }

  close = () => {
    this.props.onClose()
    this.animateModal(0, _ => {
      this.setState({ isModalOpen: false })
    })
  }

  open = () => {
    this.setState({ 
      isModalOpen: true 
    }, _ => {
      this.props.onOpen()
      this.animateModal(this.props.height)
    })
  }

  isOpen = () => {
    return this.state.isModalOpen
  }

  _renderHeader = () => {
    if (!this.props.scrollable) {
      return null
    }

    return (
      <View style={styles.header}>
        <Icon color='#bbb' name='minus' type='entypo' />
      </View>
    )
  }

  render = () => {
    let { isModalOpen, animatedHeight } = this.state
    if (!isModalOpen) return null
    return (
      <ScrollView 
        style={styles.container}
        scrollEnabled={this.props.scrollable}
        ref='scrollView'
      >
        <TouchableOpacity style={styles.overlay} onPress={this.close} />
        <Animated.View style={{ marginTop: animatedHeight, height: '100%' }}>
          <SafeAreaView style={styles.modal} forceInset={{ bottom: 'always', horizontal: 'never' }}>
            {this._renderHeader()}
            <View style={styles.body}>
              {this.props.children}
            </View>
          </SafeAreaView>
        </Animated.View>
      </ScrollView>
    )
  }
}

AnimatedModal.propTypes = {
  height: PropTypes.number,
  scrollable: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}

AnimatedModal.defaultProps = {
  height: deviceHeight / 2,
  onClose: _ => {},
  onOpen: _ => {}
}

export default AnimatedModal
