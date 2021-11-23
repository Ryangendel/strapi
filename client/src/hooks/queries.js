import { gql } from '@apollo/client';

export const GETLIKES = gql`
query {
  client (id: 1) {
      restaurantIDlikes
  }
}
`;

export const REGISTER = gql`
query restaurn{
    restaurants{
      name
      picture{
          formats
      }
    }
  }
`

export const REVIEWS = gql`
query restaurn{
    restaurants{
      name
      picture{
          formats
      }
    }
  }
  `