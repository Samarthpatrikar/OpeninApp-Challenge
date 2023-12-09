const fs = require("fs");
const { google } = require("googleapis");

const runApplication=require('./runApp');


// async function storeToken(token) {
//   try {
//     fs.writeFileSync(tokenPath, JSON.stringify(token));
//     console.log("Token stored to", tokenPath);
//   } catch (err) {
//     console.error("Error storing token:", err);
//   }
// }

// async function getStoredToken() {
//   try {
//     const token = fs.readFileSync(tokenPath);
//     return JSON.parse(token);
//   } catch (err) {
//     return null;
//   }
// }


// Run the application
runApplication();
