import gql from 'graphql-tag'

export const GetIconsAndColors = gql`
  query GetIconsAndColors {
    icons {
      id
      name
      type
    }
    colors {
      id
      name
      hex
    }
  }
`
