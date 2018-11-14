import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
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
      errors: {},
      loading: false
    }
  }

  onChangeInput = (field) => (text) => {
    this.setState(({ errors }) => ({
      [field]: text,
      errors: { ...errors, [field]: null }
    }))
  }

  onSubmit = () => {
    let { email, password } = this.state

  }

  render = () => {
    const { email, password, errors } = this.state
    return (
      <View style={styles.main}>
        {/* logo image */}
        <View style={styles.inputContainer}>
          <Icon name='person' color='#fff' />
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={this.onChangeInput('email')}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
          {errors.email &&
            <Text style={styles.inputError}>
              {errors.email}
            </Text>
          }
        </View>
        <View style={styles.inputContainer}>
          <Icon name='lock' color='#fff' />
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={this.onChangeInput('password')}
            secureTextEntry={true}
            style={styles.input}
          />
          {errors.password &&
            <Text style={styles.inputError}>
              {errors.password}
            </Text>
          }
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
