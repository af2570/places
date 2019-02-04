import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Icon } from 'react-native-elements'
import AnimatedDialog from '../AnimatedDialog'
import GridList from '../GridList'

import {
  compose,
  withStateHandlers,
  withProps,
  toRenderProps
} from 'recompose'

import { graphql } from 'react-apollo'
import { GetIconsAndColors } from './queries'
import { CreateCategory, UpdateCategory } from './mutations'

import { colors } from '../../styles'
import styles from './styles'

class CategoryDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: '#fff',
      textColor: colors.lightAccent
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    let backgroundColor = '#fff'
    let textColor = colors.lightAccent
    if (props.color && props.step === 1) {
      backgroundColor = props.color.hex
      textColor = '#fff'
    }

    return {
      backgroundColor,
      textColor
    }
  }

  close = () => {
    this.refs.dialog.close()
    this.props.resetProgress()
  }

  open = () => {
    this.refs.dialog.open()
  }

  isOpen = () => {
    return this.refs.dialog.isOpen()
  }

  canPressNext = () => {
    if (
      (this.props.step === 0 && !this.props.color) ||
      (this.props.step === 1 && !this.props.icon) ||
      (this.props.step === 2)
    ) {
      return false
    }

    return true
  }

  canPressPrevious = () => {
    if (this.props.step === 0) {
      return false
    }

    return true
  }

  canSubmit = () => {
    if (
      this.props.step === 2 &&
      this.props.color &&
      this.props.icon &&
      this.props.name
    ) {
      return true
    }
    return false
  }

  nextStep = () => {
    if (!this.canPressNext()) {
      return
    }
    this.props.next()
  }

  previousStep = () => {
    if (!this.canPressPrevious()) {
      return
    }
    this.props.previous()
  }

  submit = async () => {
    try {
      if (!this.canSubmit()) {
        return
      }
      let data = await this.props.submit()
      // console.log('submit category', data)

    } catch (err) {
      console.log('submit category error: ', err)
    }
  }

  getTitle = () => {
    switch (this.props.step) {
      case 0:
        return 'Select a color'
      case 1:
        return 'Select an icon'
      case 2:
        return 'Input a name for this list'
      default:
        return null
    }
  }

  _renderColor = ({ item }) => {
    const isSelected = (
      this.props.color &&
      this.props.color.id === item.id
    )
    return (
      <TouchableOpacity
        style={[styles.option, { backgroundColor: item.hex }]}
        onPress={_ => this.props.setColor(item)}
      >
        {isSelected &&
          <Icon name='check' size={30} color='#fff' />
        }
      </TouchableOpacity>
    )
  }

  _renderIcon = ({ item }) => {
    const isSelected = (
      this.props.icon &&
      this.props.icon.id === item.id
    )
    let style = [styles.option]
    if (isSelected) {
      style.push(styles.selectedOption)
    }

    return (
      <TouchableOpacity style={style} onPress={_ => this.props.setIcon(item)}>
        <Icon {...item} color='#fff' size={30} />
      </TouchableOpacity>
    )
  }

  _renderContent = () => {
    switch (this.props.step) {
      case 0:
        return (
          <GridList
            data={this.props.data.colors}
            renderItem={this._renderColor}
            ItemEmptyComponent={_ => <View style={styles.option} />}
          />
        )
      case 1:
        return (
          <GridList
            data={this.props.data.icons}
            renderItem={this._renderIcon}
            ItemEmptyComponent={_ => <View style={styles.option} />}
          />
        )
      case 2:
        return (
          <View style={styles.nameContainer}>
            <View
              style={[
                styles.bigIcon,
                { backgroundColor: this.props.color.hex }
              ]}
            >
              <Icon {...this.props.icon} color='#fff' size={32} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='name'
                placeholder='e.g. "Date Night Spots"'
                value={this.props.name}
                onChangeText={text => this.props.setName(text)}
                onSubmitEditing={_ => this.submit()}
                returnKeyType='done'
                style={styles.input}
                placeholderTextColor={this.state.textColor}
              />
            </View>
          </View>
        )
      default:
        return null
    }
  }

  _renderProgress = () => {
    let { textColor } = this.state

    let canPressNext, nextButtonText, nextButtonAction
    if (this.props.step < 2) {
      canPressNext = this.canPressNext()
      nextButtonText = 'Next'
      nextButtonAction = this.nextStep
    } else {
      canPressNext = this.canSubmit()
      nextButtonText = 'Submit'
      nextButtonAction = this.submit
    }

    return (
      <View style={styles.footer}>
        {this.canPressPrevious() &&
          <TouchableOpacity onPress={this.previousStep}>
            <Text style={[styles.progressText, { color: textColor }]}>
              Previous
            </Text>
          </TouchableOpacity>
        }
        <View />
        <TouchableOpacity
          style={{ opacity: canPressNext ? 1 : 0.6 }}
          disabled={!canPressNext}
          onPress={nextButtonAction}
        >
          <Text style={{ color: textColor }}>
            {nextButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render = () => {
    let { backgroundColor, textColor } = this.state

    return (
      <AnimatedDialog ref='dialog' color={backgroundColor} textColor={textColor}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: textColor }]}>
              {this.getTitle()}
            </Text>
          </View>
          <View style={styles.body}>
            {this._renderContent()}
          </View>
          {this._renderProgress()}
        </View>
      </AnimatedDialog>
    )
  }

}

const enhance = compose(
  withStateHandlers(
    ({ category }) => ({
      step: 0,
      color: null,
      icon: null,
      name: ''
    }),
    {
      next: ({ step }) => _ => ({ step: step + 1 }),
      previous: ({ step }) => _ => ({ step: step - 1 }),
      resetProgress: _ => _ => ({
        step: 0,
        color: null,
        icon: null,
        name: ''
      }),
      setColor: _ => (color) => ({ color }),
      setIcon: _ => (icon) => ({ icon }),
      setName: _ => (name) => ({ name })
    }
  ),
  graphql(GetIconsAndColors),
  graphql(CreateCategory, { name: 'createCategory' }),
  graphql(UpdateCategory, { name: 'updateCategory' }),
  withProps((props) => ({
    submit: async _ => {
      if (!props.color || !props.icon || !props.name) {
        return Promise.reject('Missing color, icon or name')
      }

      let variables = {
        id: props.category && props.category.id,
        name: props.name,
        icon_id: props.icon.id,
        color_id: props.color.id
      }

      if (props.category) {
        return props.updateCategory({ variables }).then(({ data }) => data.update_category)
      } else {
        return props.createCategory({ variables }).then(({ data }) => data.create_category)
      }
    }
  }))
)

const Enhancer = toRenderProps(enhance)

export default React.forwardRef((props, ref) => (
  <Enhancer {...props}>
    {(enhancedProps) => (
      <CategoryDialog {...enhancedProps} ref={ref} />
    )}
  </Enhancer>
))
