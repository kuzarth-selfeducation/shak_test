import gql from 'graphql-tag';

const GET_PROVIDERS = gql`
  {
    providers {
      id
      name
      url
      icon_url
    }
  }
`;

export default GET_PROVIDERS;
