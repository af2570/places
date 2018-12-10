import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

import styles from './styles'
import { colors } from '../../styles'

class AnimatedModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      animatedHeight: new Animated.Value(0)
    }
  }

  animateModal = (height, cb = () => {}) => {
    Animated.timing(this.state.animatedHeight, {
      toValue: height,
      duration: 400
    }).start(cb)
  }

  close = () => {
    this.animateModal(0, _ => {
      this.setState({ isModalOpen: false })
    })
  }

  open = () => {
    const height = this.props.height || 400
    this.setState(
      { isModalOpen: true },
      _ => this.animateModal(height)
    )
  }

  isOpen = () => {
    return this.state.isModalOpen
  }

  _renderHeader = () => {
    if (!this.props.withHeader) {
      return null
    }

    return (
      <View style={styles.header}>
        <View style={{ width: 28 + 14 }}/>
        {this.props.title &&
          <Text style={styles.headerText}>{this.props.title}</Text>
        }
        <TouchableOpacity style={styles.headerIcon} onPress={_ => this.close()}>
          <Icon name='close' color='#fff' />
        </TouchableOpacity>
      </View>
    )
  }

  render = () => {
    let { isModalOpen, animatedHeight } = this.state

    // TODO: fix iphone X padding on bottom

    return (
      <Modal
        transparent
        animationType='none'
        onRequestClose={this.close}
        visible={isModalOpen}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.overlay} onPress={this.close} />
          <Animated.View style={{ height: animatedHeight }}>
            <SafeAreaView style={styles.modal} forceInset={{ bottom: 'always', horizontal: 'never' }}>
              {this._renderHeader()}
              <View style={styles.body}>
                {this.props.children}
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

export default AnimatedModal
