import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'
import { Logo } from '../../images'

import { compose } from 'recompose'
import { withNav } from '../../../lib/recompose'
import LocalStorage from '../../../lib/LocalStorage'

import { graphql } from 'react-apollo'
import { ViewerQuery } from './queries'
import { LoginMutation } from './mutations'

import styles from './styles'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  onChangeInput = (field) => (text) => {
    this.setState({ [field]: text })
  }

  onSubmit = async () => {
    let { email, password } = this.state
    if (!email || !password) {
      Alert.alert(
        'Fill all fields',
        'Email and password are required'
      )
      return
    }

    try {
      let { data } = await this.props.login({
        variables: {
          email,
          password
        }
      })

      let { success, message, token } = data.login || {}

      if (!success) {
        Alert.alert(
          'Oops!',
          message || 'I was unable to process your request.'
        )
        console.log('Failed: ', data.login)
        return
      }

      console.log('Success: ', data.login)
      LocalStorage.setItem('places_access_token', token)
      // Alert.alert('Success!', 'You were logged in.')
      this.props.navigate('Home')
    } catch (err) {
      Alert.alert(
        'Oops!',
        'I was unable to process your request.'
      )
      console.log('Error: ', err)
    }
  }

  render = () => {
    const { email, password } = this.state

    return (
      <View style={styles.main}>
        <KeyboardAwareScrollView>
          <Image
            key='loginLogo'
            resizeMode='contain'
            style={styles.logo}
            source={Logo}
          />
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <Icon
                name='person'
                color='#fff'
                style={styles.inputIcon}
              />
              <TextInput
                ref='email'
                placeholder='Email'
                value={email}
                onChangeText={this.onChangeInput('email')}
                onSubmitEditing={() => {
                  this.refs.password.focus()
                }}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor='#fff'
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name='lock'
                color='#fff'
                style={styles.inputIcon}
              />
              <TextInput
                ref='password'
                placeholder='Password'
                value={password}
                onChangeText={this.onChangeInput('password')}
                onSubmitEditing={() => {
                  if (email && password) {
                    this.onSubmit()
                  }
                }}
                returnKeyType='go'
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor='#fff'
              />
            </View>
            <TouchableOpacity
              onPress={this.onSubmit}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const enhance = compose(
  withNav,
  graphql(ViewerQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(LoginMutation, { name: 'login' })
)

export default enhance(Login)
