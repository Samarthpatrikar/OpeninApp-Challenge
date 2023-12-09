

async function sendReplies(gmail, emailDetails, userEmail) {
    try {
      if (
        emailDetails &&
        emailDetails.messages &&
        emailDetails.messages.length > 0
      ) {
        const recipientAddress = emailDetails.senderAddress;
        const receivedSubject = emailDetails.messages[0].payload.headers.find(
          (header) => header.name === "Subject"
        ).value;
  
        if (recipientAddress) {
          const replyMessage = `Can't Read Emails for now, Will get bakck to you soon.`;
  
          // Encode the entire email message as a base64 string
          const encodedReply = Buffer.from(
            `To: ${recipientAddress}\r\nFrom: ${userEmail}\r\nSubject: Re: ${receivedSubject}\r\n\r\n${replyMessage}`
          ).toString("base64");
  
          const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
              threadId: emailDetails.id,
              raw: encodedReply,
            },
          });
  
          if (response.status === 200) {
            console.log("Reply sent successfully.");
            return true;
          } else {
            console.error("Error sending replies. Status code:", response.status);
            return false;
          }
        } else {
          console.error("Error: Recipient address not found.");
          return false;
        }
      } else {
        console.error("Error: Email messages are undefined or empty.");
        return false;
      }
    } catch (error) {
      console.error("Error sending replies:", error);
      return false;
    }
  }

  module.exports=sendReplies;