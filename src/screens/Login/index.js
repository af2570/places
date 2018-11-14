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
import { Logo } from '../../images'

import { compose } from 'recompose'
import { withNav } from '../../../lib/recompose'

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

  onSubmit = () => {
    let { email, password } = this.state

  }

  render = () => {
    const { email, password } = this.state

    return (
      <View style={styles.main}>
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
              placeholder='Email'
              value={email}
              onChangeText={this.onChangeInput('email')}
              keyboardType='email-address'
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
              placeholder='Password'
              value={password}
              onChangeText={this.onChangeInput('password')}
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
