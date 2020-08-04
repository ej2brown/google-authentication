require("dotenv").config();

// const start = require("./scripts/api.js");
if (typeof process.env !== 'undefined') {
  console.log('process.env', process.env);
}
if (typeof process.env.GOOGLE_CLIENT_ID !== 'undefined') {
  console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID);
}
if (typeof GOOGLE_CLIENT_ID !== 'undefined') {
  console.log('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID);
}
if (typeof $GOOGLE_CLIENT_ID !== 'undefined') {
  console.log('GOOGLE_CLIENT_ID', $GOOGLE_CLIENT_ID);
}
if (typeof env !== 'undefined') {
  console.log('env', env);
}

if (typeof ACCESS_TOKEN !== 'undefined') {
  console.log('ACCESS_TOKEN', ACCESS_TOKEN);
}

const API_KEY = process.env.GOOGLE_CLIENT_ID;