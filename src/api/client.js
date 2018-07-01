import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { delay, formatPhone } from 'utils/helpers';

const typeDefs = `
type Query {
  providers: [Provider]
  provider(id: ID!): Provider
}
type Mutation {
  refillPhone(input: RefillInput): Refill
}
input RefillInput {
  id: ID!
  phone_num: String!
  amount: Int!
}
type Refill {
  id: ID!
  phone_num: String,
  amount: Int,
  provider_name: String,
}
type Provider {
  id: ID!
  name: String!
  url: String!
  icon_url: String!
}
`;

const providersData = [
  {
    id: '1',
    name: 'MTS',
    url: 'www.mts.ru',
    icon_url:
      'https://upload.wikimedia.org/wikipedia/commons/c/c2/MTS_logo.svg',
  },
  {
    id: '2',
    name: 'Beeline',
    url: 'www.beeline.ru',
    icon_url: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Beeline.svg',
  },
  {
    id: '3',
    name: 'MegaFon',
    url: 'www.megafon.ru',
    icon_url:
      'https://upload.wikimedia.org/wikipedia/commons/b/bd/MegaFon-Logo.svg',
  },
];

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  Query: () => ({
    providers: async () => {
      await delay(1000);
      return providersData;
    },
    provider: async (_, { id }) => {
      await delay(1000);
      return providersData.find(el => el.id === id);
    },
  }),
  Mutation: () => ({
    refillPhone: async (_, { input }) => {
      console.log(input);
      const { id, phone_num, amount } = input;
      await delay(1000);

      const value = Math.random();

      if (value > 0.5) {
        throw Error('Something went wrong!');
      } else {
        return {
          id,
          phone_num: formatPhone(phone_num),
          amount,
          provider_name: providersData.find(el => el.id === id).name,
        };
      }
    },
  }),
};

addMockFunctionsToSchema({ schema, mocks });

const schemaLink = new SchemaLink({ schema });

const client = new ApolloClient({
  link: schemaLink,
  cache: new InMemoryCache(),
});

export default client;
