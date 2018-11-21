import React, { Component } from 'react'
import { View } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { colors } from '../../styles'

class DrawerContentComponent extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <View style={{backgroundColor: colors.light, flex: 1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </View>
    )
  }
}

export default DrawerContentComponent
