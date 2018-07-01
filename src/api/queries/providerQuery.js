import gql from 'graphql-tag';

const GET_PROVIDER = gql`
  query provider($id: ID!) {
    provider(id: $id) {
      id
      name
      icon_url
    }
  }
`;

export default GET_PROVIDER;
