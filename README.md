# Google Authentication

Deployed on Netlify: 
https://google-auth.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/344c98b7-a37f-4614-90e0-84530789fc95/deploy-status)](https://app.netlify.com/sites/google-auth/deploys)


https://developers.google.com/identity/sign-in/web/sign-in


[Authenticate with a backend server](https://developers.google.com/identity/sign-in/web/backend-auth) done in [server.js](./server.js)

**⚠️ This will not work on non-whitelisted URL's! ⚠️**
## Setup

1. [Obtain an client id](https://developers.google.com/) 
2. Put it in the .env file
2. *Optional*: put server URL env
3. Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```