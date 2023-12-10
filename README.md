# OpeninApp-Challenge
These are the node.js code files used in OpenInApp Backend Internship Challenge 
# Required Modules
fs: File system module for reading and writing files.
googleapis: The Google APIs Node.js client library for seamless access to Google APIs.
promisify: Converts callback-based functions to Promise-based functions.
readline: Facilitates reading input from the command line.
Credentials and OAuth2 Setup
client_id, client_secret: Credentials for OAuth2 authentication.
redirect_uris: Redirect URI after user permission is granted.
tokenPath: File path for storing OAuth2 tokens.
SCOPES: Gmail API scopes for required permissions.
OAuth2Client Setup
An OAuth2Client is created using the provided credentials.

# Utility Functions
mentioned in  init.js
base64url: Encodes a string to base64url format.
getAuthorizationCode: Generates an authorization URL and guides the user through entering the code.
getAccessToken: Retrieves or obtains a new access token.
# Gmail Initialization
In init.js initializeGmail file function  sets up the Gmail API client, retrieves or obtains access tokens, and returns a configured Gmail client.

# Main Application Loop
The runApplication(in the runApp.js) function serves as the main loop, continuously checking for new emails, sending automated replies, labeling/moving emails, and introducing a random sleep interval between 45 to 120 seconds.

# Check for New Emails
The checkForNewEmails(in checkForEmail.js) function utilizes the Gmail API to identify the latest email in the inbox. Upon finding a new email, it extracts essential details such as sender and recipient addresses.

# Send Replies
The sendReplies(in sendreply.js) function automates the process of responding to the sender of a new email. It encodes the reply message and dispatches it using the Gmail API.

# Label and Move Email
The labelAndMoveEmail(in label.js) function categorizes the processed email with a specified label. If the label is absent, it creates the label before applying it.

# Running the Application
The script initiates the main application loop, consistently monitoring for new emails, responding promptly, and efficiently organizing the inbox.

# Containerization using docker
Made Application portable(making application container) using docker . The application runs successfully on docker engine .

# dotenv
The original credentials are mentioned in .env file which are hidden on github due to security issues .

# Video guide 
https://drive.google.com/file/d/1FuvBR6tkoA0eEUP0vhFF4OReJszdJBFf/view?usp=sharing
