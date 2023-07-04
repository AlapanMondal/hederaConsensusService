const {
    TopicCreateTransaction,
    Client,
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


//Setting-up the client to interact with Hedera Test Network
const client = Client.forTestnet();

client.setOperator(excuterId, excuterPvKey);


const memo = "Car #12345"
async function main() {
    //Create a new topic
    const transaction = new TopicCreateTransaction()
        .setAdminKey(excuterPvKey)
        .setTopicMemo(memo)
        .setSubmitKey(excuterPvKey);

    //Submit the transaction to a Hedera network  
    const txResponse = await transaction.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the record of the transaction
    const record = await txResponse.getRecord(client);

    //Grab the new topic ID from the receipt
    const topicId = receipt.topicId;

    //Grab the new transaction ID from the receipt
    const txnId = record.transactionId;

    //Log the Transacation ID
    console.log(`Transaction Id: ${txnId}`);

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);


    process.exit();
}

// The async function is being called in the top-level scope.
main();