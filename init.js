
const fs = require("fs");
const { google } = require("googleapis");
const { promisify } = require("util");
const readline = require("readline");

require('dotenv').config();


const client_id =
  process.env.CLIENT_ID;

const client_secret = process.env.CLIENT_SECRET;
const redirect_uris = process.env.REDIRECT_URIS;

const tokenPath = "token.json"; // Path to store token

const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

async function base64url(source) {
  let encoded = Buffer.from(source).toString("base64");
  encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return encoded;
}

async function getAuthorizationCode() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter the authorization code: ", (code) => {
      rl.close();
      resolve(code.trim());
    });
  });
}

async function getAccessToken() {
    try {
      const token = await promisify(fs.readFile)(tokenPath);
      oAuth2Client.setCredentials(JSON.parse(token));
    } catch (err) {
      const authCode = await getAuthorizationCode();
      const { tokens } = await oAuth2Client.getToken(authCode);
      oAuth2Client.setCredentials(tokens);
  
      // Store the obtained token
      fs.writeFileSync(tokenPath, JSON.stringify(tokens));
    }
  }

async function initializeGmail() {
    await getAccessToken();
  
    try {
      // Log the tokens (optional)
      console.log("Access token:", oAuth2Client.credentials.access_token);
      console.log("Refresh token:", oAuth2Client.credentials.refresh_token);
  
      // Create Gmail client
      return google.gmail({
        version: "v1",
        auth: oAuth2Client,
        userEmail: "patrikarsamarth@gmail.com",
      });
    } catch (err) {
      console.error("Error loading credentials:", err);
      return null;
    }
  }

  module.exports=initializeGmail;