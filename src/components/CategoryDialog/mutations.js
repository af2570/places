import gql from 'graphql-tag'

export const CreateCategory = gql`
  mutation CreateCategory(
    $name: String!
    $icon_id: String!
    $color_id: String!
  ) {
    create_category(
      name: $name
      icon_id: $icon_id
      color_id: $color_id
    ) {
      id
      categories {
        id
        name
        icon {
          id
          name
          type
        }
        color {
          id
          name
          hex
        }
      }
    }
  }
`

export const UpdateCategory = gql`
  mutation UpdateCategory(
    $id: String!
    $name: String!
    $icon_id: String!
    $color_id: String!
  ) {
    update_category(
      id: $id
      name: $name
      icon_id: $icon_id
      color_id: $color_id
    ) {
      id
      categories {
        id
        name
        icon {
          id
          name
          type
        }
        color {
          id
          name
          hex
        }
      }
    }
  }
`
