"use strict";

const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { OAuth2Client } = require('google-auth-library');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/api/tokensignin", (req, res) => {
  verify().catch(console.error);
})
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

const verify = async (token) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const user = fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${userid}`);
  console.log(user);
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
