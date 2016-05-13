var request = require('request');
var paypal = request;

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
    tokenservice: baseUri + '/v1/identity/openidconnect/tokenservice'
  };
  
  paypal = request.defaults({
    baseUrl: baseUri,
    auth: {
      username: config.clientId,
      password: config.secret,
      sendImmediately: false
    }
  });
}

/**
 * This object represents an access token returned in the response.
 * @typedef {Object} tokeninfo
 * @property {string} scope - A space-separated list of access privileges granted by the access token.
 * @property {string} token_type - The type of the token issued as described in OAuth2.0 RFC6749 - Section 7.1. Value is case insensitive.
 * @property {number} expires_in - The lifetime of the access token in seconds. After the access token expires, use the refresh_token to refresh the access token.
 * @property {string} refresh_token - The refresh token, which can be used to obtain new access tokens using the same authorization grant as described in OAuth2.0 RFC6749 - Section 6.
 * @property {string} access_token - The access token issued by the authorization server.
 */
 
/**
 * Called after a token service is invoked.
 * @callback tokenServiceCallback
 * @param {Error} err
 * @param {tokeninfo} tokeninfo
 */
 
/**
 * Create an access token from an authorization code.
 * @param {string} code - Authorization code previously received from the authorization server.
 * @param {tokenServiceCallback} callback
 * @see {@link https://developer.paypal.com/docs/api/#grant-token-from-authorization-code Grant Token from Authorization Code}
 */
function grantTokenFromAuthCode(code, callback) {
  paypal.post('http://some.server.com/', {
    form: {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.redirect.uri
    }
  }, function(err, res, body) {
    if (err) {
      callback(err);
    } else {
      
    }
  });
}

module.exports = {
  configure: configure,
  grantTokenFromAuthCode: grantTokenFromAuthCode
};
