import { gql } from '@apollo/client';

export const GETLIKES = gql`
  query getClients {
    client(id:1) {
        RestaurantIDlikes
    }
  }
`;
