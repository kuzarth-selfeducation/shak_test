let config;

switch (process.env.NODE_ENV) {
  case 'production': {
    config = {
      ROUTER_BASE_NAME: '/shak_test',
    };
    break;
  }

  default: {
    config = {
      ROUTER_BASE_NAME: '/',
    };
    break;
  }
}

export default config;
