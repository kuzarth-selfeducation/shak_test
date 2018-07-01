import gql from 'graphql-tag';

const REFILL_PHONE = gql`
  mutation refillPhone($input: RefillInput!) {
    refillPhone(input: $input) {
      id
      phone_num
      amount
      provider_name
    }
  }
`;

export default REFILL_PHONE;
