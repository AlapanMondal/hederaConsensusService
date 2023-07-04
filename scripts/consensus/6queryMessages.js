const {
    TopicMessageQuery,
    Client,
    PrivateKey,
} = require("@hashgraph/sdk");
const moment = require('moment');
// re÷quire('moment-/timezone');

// Loads environment variables from a .env file into process.env object using the dotenv package.
require('dotenv').config({ path: "../../.env" });

// Configuring the treasury account
const myAccountId = process.env.ACCOUNT3_ID;
const myPrivateKey = PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY);

// Throw a new error if we were unable to retrieve it.
if (myAccountId == null || myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Configuring the topic id
const topicId = process.env.TOPIC_ID;

// Throw a new error if we were unable to retrieve it.
if (topicId == null) {
    throw new Error("Environment variable topicId must be present");
}

// Setting up the client to interact with Hedera Test Network
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);



async function main() {

    const query = new TopicMessageQuery()
        .setTopicId(topicId)
        .setStartTime(0)
        .subscribe(
            client,
            (message) => console.log(Buffer.from(message.contents, "utf8").toString())
        );
}

main();
