import gql from 'graphql-tag'

export const LoginMutation = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      success
      message
      token
      viewer {
        id
        email
        first_name
        last_name
      }
    }
  }
`
