

async function checkForNewEmails(gmail) {
    try {
      const response = await gmail.users.messages.list({
        userId: "me",
        labelIds: ["INBOX"],
        maxResults: 1,
      });
  
      const messages = response.data.messages || [];
  
      if (messages.length > 0) {
        const firstMessageId = messages[0].id;
        const messageDetails = await gmail.users.messages.get({
          userId: "me",
          id: firstMessageId,
        });
  
        const toHeader = messageDetails.data.payload.headers.find(
          (header) => header.name === "To"
        );
        const fromHeader = messageDetails.data.payload.headers.find(
          (header) => header.name === "From"
        );
        const recipientAddress = toHeader ? toHeader.value : null;
        const senderAddress = fromHeader ? fromHeader.value : null;
  
        console.log("Recipient Address:", recipientAddress);
        console.log("Sender Address:", senderAddress);
  
        return {
          id: messageDetails.data.threadId,
          messages: [messageDetails.data],
          recipientAddress,
          senderAddress,
        };
      } else {
        console.log("No new emails found.");
        return null;
      }
    } catch (error) {
      console.error("Error checking for new emails:", error);
      return null;
    }
  }
  
  module.exports=checkForNewEmails;