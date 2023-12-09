async function labelAndMoveEmail(gmail, threadId, labelName) {
    try {
      // Use the Gmail API to get the list of labels
      const labels = await gmail.users.labels.list({
        userId: "me",
      });
  
      // Check if the desired label exists
      const label = labels.data.labels.find((label) => label.name === labelName);
  
      if (label) {
        // Apply the label to the thread
        await gmail.users.threads.modify({
          userId: "me",
          id: threadId,
          requestBody: {
            addLabelIds: [label.id],
          },
        });
  
        console.log(`Email labeled with "${labelName}"`);
        return true;
      } else {
        // If the label doesn't exist, create it
        const createdLabel = await gmail.users.labels.create({
          userId: "me",
          requestBody: {
            name: labelName,
            labelListVisibility: "labelShow",
            messageListVisibility: "show",
          },
        });
  
        if (createdLabel.status === 200) {
          console.log(`Label "${labelName}" created.`);
          // Apply the label to the thread
          await gmail.users.threads.modify({
            userId: "me",
            id: threadId,
            requestBody: {
              addLabelIds: [createdLabel.data.id],
            },
          });
  
          console.log(`Email labeled with "${labelName}"`);
          return true;
        } else {
          console.error(
            `Error creating label "${labelName}". Status code:`,
            createdLabel.status
          );
          return false;
        }
      }
    } catch (error) {
      console.error("Error labeling and moving email:", error);
      return false;
    }
  }

  module.exports=labelAndMoveEmail;