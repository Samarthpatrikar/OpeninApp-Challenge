
const sendReplies=require('./sendReply');
const checkForNewEmails=require('./checkForEmail');
const initializeGmail=require('./init');
const labelAndMoveEmail=require('./label');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runApplication() {
    const gmail = await initializeGmail();
  
    if (!gmail) {
      console.error("Error initializing Gmail API");
      return;
    }
  
    while (true) {
      try {
        const emailDetails = await checkForNewEmails(gmail);
  
        if (emailDetails) {
          const success = await sendReplies(
            gmail,
            emailDetails,
            "patrikarsamarth@gmail.com"
          );
          console.log(`New email received with ID: ${emailDetails.id}`);
          console.log(`Recipient Address: ${emailDetails.recipientAddress}`);
  
          if (success) {
            await labelAndMoveEmail(gmail, emailDetails.id, "Incoming");
          }
        }
  
        const interval = Math.floor(Math.random() * (120 - 45 + 1) + 45);
        console.log(`Waiting for ${interval} seconds...`);
        await sleep(interval * 1000); // Convert seconds to milliseconds
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  
module.exports=runApplication;