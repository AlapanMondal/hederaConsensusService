const {
    Client,
    TopicMessageSubmitTransaction,
    PrivateKey,
} = require("@hashgraph/sdk");
// Loads environment variables from a .env file into process.env object using the dotenv package.

require('dotenv').config({ path: "../../.env" });

// Configuring the executer account
const excuterId = process.env.PORTAL_ACCOUNT_ID;
const excuterPvKey = PrivateKey.fromString(process.env.PORTAL_ACCOUNT_PRIVATE_KEY);

//Throw a new error if we were unable to retrieve it.
if (excuterId == null ||
    excuterPvKey == null) {
    throw new Error("Environment variables excuterId and excuterPvKey must be present");
}

// Configuring the topic id
const topicId = process.env.TOPIC_ID;
//Throw a new error if we were unable to retrieve it.
if (topicId == null) {
    throw new Error("Environment variables topicId must be present");
}



const client = Client.forTestnet();

client.setOperator(excuterId, excuterPvKey);



async function SubmitMessage() {


    //Send the message
    let currentDate = new Date();
    let currentTime = currentDate.toLocaleTimeString();
    let currentDateString = currentDate.toDateString();

    let sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: `While writing the msg, the time was ${currentTime} on ${currentDateString}.`,
    }).execute(client);

    //Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);

    //Get the status of the transaction
    const transactionStatus = getReceipt.status;
    console.log("The message transaction status: " + transactionStatus.toString());
    process.exit()
}

// The async function is being called in the top-level scope.
SubmitMessage();
