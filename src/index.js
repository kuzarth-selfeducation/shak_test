import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from 'api/client';
import config from 'constants/config';
import App from 'containers/App';

ReactDOM.render(
  <BrowserRouter basename={config.ROUTER_BASE_NAME}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
