import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'

import styles from './styles'
import { colors } from '../../styles'

class AnimatedDialog extends Component {
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
    const height = Dimensions.get('window').height
    this.setState(
      { isModalOpen: true },
      _ => this.animateModal(height)
    )
  }

  isOpen = () => {
    return this.state.isModalOpen
  }

  _renderHeader = () => {
    const { withHeader, title, textColor } = this.props
    if (!withHeader) {
      return null
    }

    let color = textColor || colors.lightAccent

    return (
      <View style={styles.header}>
        <View style={{ width: 28 + 14 }} />
        {title &&
          <Text style={[styles.headerText, { color }]}>
            {title}
          </Text>
        }
        <TouchableOpacity style={styles.headerIcon} onPress={_ => this.close()}>
          <Icon name='close' color={color} />
        </TouchableOpacity>
      </View>
    )
  }

  render = () => {
    let { isModalOpen, animatedHeight } = this.state

    return (
      <Modal
        transparent
        animationType='none'
        onRequestClose={this.close}
        visible={isModalOpen}
      >
        <View style={styles.container}>
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{
              top: 'always',
              bottom: 'always',
              horizontal: 'never'
            }}
          >
            <TouchableOpacity style={styles.overlay} onPress={_ => this.close()} />
            <Animated.View style={{ height: animatedHeight }}>
              <View
                style={[
                  styles.dialog,
                  { backgroundColor: this.props.color || '#fff' }
                ]}
              >
                {this._renderHeader()}
                <View style={styles.body}>
                  {this.props.children}
                </View>
              </View>
            </Animated.View>
          </SafeAreaView>
        </View>
      </Modal>
    )
  }
}

export default AnimatedDialog
