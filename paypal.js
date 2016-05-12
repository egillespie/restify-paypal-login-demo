
var config = {
  sandbox: true,
  clientId: '',
  secret: '',
  redirect: {
    uri: ''
  }
};

function configure(newConfig) {
  config = newConfig;

  var baseUri = 'https://api.paypal.com';
  if (config.sandbox) {
    baseUri = 'https://api.sandbox.paypal.com';
  }

  config.urls = {
    base: baseUri,
    grantTokenFromAuthCode: baseUri + '/v1/identity/openidconnect/tokenservice'
  };
}

/**
 * https://developer.paypal.com/docs/api/#grant-token-from-authorization-code
 */
function grantTokenFromAuthCode(code, callback) {
  
}

module.exports = {
  configure: configure,
  grantTokenFromAuthCode: grantTokenFromAuthCode
};
