# Restify + PayPal Login Demo

If you want to see a simple demonstration of how to add Log In with PayPal functionality to your Node.js application, here's an example of how to do it!

This demo uses [Restify][3] to show how you can implement the login in a REST-API-ish sort of way. Restify is also used to serve static HTML files, but there's no reason you couldn't host those somewhere entirely different and leave Restify to do its API thing.

### 1. Download and Install Dependencies

Run the following commands to get started. This demo assumes you have a working terminal with both [Git][1] and [Node.js][2] installed.

```sh
$ git clone https://github.com/egillespie/restify-paypal-login-demo.git
$ cd restify-paypal-login-demo
$ npm install
```

### 2. Setup a PayPal Developer Account

In order for this demo to work, you will need a [PayPal Developer Account][4]. Follow the link, sign up, then follow the instructions below to configure an app in the developer dashboard to allow Log In with PayPal.

From the PayPal Developer dashboard, do the following:

1. Click the "Create App" button on the *My Apps &amp; Credentials* page.
2. Enter a name. Anything will do.
3. In the *Sandbox App Settings* section, do the following:
   * Use the value "http://localhost:8080/login/return.html" as the Return URL.
   * Make sure "Log In with PayPal" is checked.
   * Expand the "Advanced Options" section below "Log In with PayPal".
     * Expand "Address Information" and check "Email Address".
     * Enter a "Privacy policy URL".
     * Enter a "User agreement URL".
4. Click the "Save" button.

At the top of the page you will now have a Client ID and Secret that you will need for the next step.

### 3. Create `config.js`

Now that you have a PayPal Developer Account and API, you'll need to put your Client ID and Secret in a file named `config.js` in order for this demo to work.

In your `restify-paypal-login-demo/` directory, create a text file named `config.js` and add the following content to it, replacing CLIENT_ID and SECRET, and RETURN_URI with the values from Step 2.

```js
module.exports = {
  paypal: {
    mode: 'sandbox',
    client_id: 'CLIENT_ID',
    client_secret: 'SECRET',
    openid_redirect_uri: 'http://localhost:8080/login/return.html'
  }
};
```

### 4. Start the Server

Use the following command to start the server:

```sh
$ node server
```

### 5. Try It Out

Visit [http://localhost:8080/index.html](http://localhost:8080/index.html) in a browser to see the demo in action.

[1]: https://git-scm.com/ "Install Git"
[2]: https://nodejs.org/ "Install Node.js and NPM"
[3]: http://restify.com/ "Restify Framework"
[4]: https://developer.paypal.com/ "PayPal Developer Homepage"
