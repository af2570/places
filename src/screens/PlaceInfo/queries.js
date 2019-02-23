import gql from 'graphql-tag'

export const PlaceQuery = gql`
  query PlaceQuery($id: String!) {
    place(id: $id) {
      id
      name
      description
      formattedAddress
      categories {
        id
        name
        pluralName
        primary
      }
      location {
        lat
        lng
      }
      url
      price {
        tier
      }
      topImage: bestFoursquarePhoto {
        id
        url
        width
        height
      }
      contact {
        phone
        formattedPhone
        facebook
        instagram
        twitter
      }
      added
      openHours {
        hours {
          days
          includesToday
          open {
            start
            end
            followingDay
          }
        }
      }
      userCategories {
        id
        name
        icon {
          id
          name
          type
        }
        color {
          id
          hex
        }
      }
    }
  }
`


/**
 * 
{
  "data": {
    "place": {
      "id": "53a5f0ff498e7989b0b2d66c",
      "formattedAddress": [
        "25 Cedar St (William Street)",
        "New York, NY 10005",
        "United States"
      ],
      "categories": [
        {
          "id": "4bf58dd8d48988d11e941735",
          "name": "Cocktail Bar",
          "pluralName": "Cocktail Bars",
          "primary": true
        }
      ]
      "openHours": {
        "hours": [
          {
            "days": [
              1
            ],
            "includesToday": null,
            "open": [
              {
                "start": "1530",
                "end": "+0000",
                "followingDay": true
              }
            ]
          },
          {
            "days": [
              2,
              3
            ],
            "includesToday": null,
            "open": [
              {
                "start": "1530",
                "end": "+0200",
                "followingDay": true
              }
            ]
          },
          {
            "days": [
              4,
              5
            ],
            "includesToday": null,
            "open": [
              {
                "start": "1400",
                "end": "+0200",
                "followingDay": true
              }
            ]
          },
          {
            "days": [
              6
            ],
            "includesToday": true,
            "open": [
              {
                "start": "1700",
                "end": "+0200",
                "followingDay": true
              }
            ]
          }
        ]
      }
    }
  }
}
 */