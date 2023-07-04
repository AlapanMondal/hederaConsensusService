const {
    ScheduleSignTransaction,
    Client,
    PrivateKey
} = require("@hashgraph/sdk");

// Loading values from ennvironment file
require('dotenv').config({ path: "../../.env" });

// Configuring the executer account
const excuterId = process.env.PORTAL_ACCOUNT_ID;
const excuterPvKey = PrivateKey.fromString(process.env.PORTAL_ACCOUNT_PRIVATE_KEY);

//Throw a new error if we were unable to retrieve it.
if (excuterId == null ||
    excuterPvKey == null) {
    throw new Error("Environment variables excuterId and excuterPvKey must be present");
}

// Fetch Account5 Id and private key and  put down it as signerId
const signerId = process.env.ACCOUNT3_ID;
const signerPrivateKey = PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY);

// Validating signerId and signerPrivateKey for null value
if (signerId == null ||
    signerPrivateKey == null ) {
    throw new Error("Environment variables signerId and signerPrivateKey must be present");
}

const scheduleId = process.env.SCHEDULE_ID;
//Throw a new error if we were unable to retrieve it.
if (scheduleId == null) {
    throw new Error("Environment variables topicId must be present");
}
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
//Setting-up the client to interact with Hedera Test Network
const client = Client.forTestnet();
client.setOperator(excuterId, excuterPvKey);


// Define submitSignature() function to submit the signature
async function submitSignature() {

    //Create the transaction
    const transaction = await new ScheduleSignTransaction()
        .setScheduleId(scheduleId)
        .freezeWith(client)
        .sign(signerPrivateKey);

    //Sign with the client and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction status
    const transactionStatus = receipt.status;
    console.log("The transaction consensus status is " +transactionStatus);

    process.exit();

}

// Call submitSignature() function to execute program
submitSignature();