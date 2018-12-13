import gql from 'graphql-tag'

export const SearchPlaces = gql`
  query SearchPlaces(
    $location: PointInput!
    $keyword: String!
    $skip: Boolean!
  ) {
    places(
      location: $location
      keyword: $keyword
    ) @skip(if: $skip) {
      id
      name
      type
      categories
      phone
      address
      city
      state
      zip
      location {
        lat
        lng
      }
      added
    }
  }
`
