const {
    ScheduleInfoQuery,
    Client,
    PrivateKey
} = require("@hashgraph/sdk");

// Loading values from ennvironment file
require('dotenv').config({ path: "../../.env" });

const moment = require('moment');

// Configuring the executer account
const excuterId = process.env.PORTAL_ACCOUNT_ID;
const excuterPvKey = PrivateKey.fromString(process.env.PORTAL_ACCOUNT_PRIVATE_KEY);

//Throw a new error if we were unable to retrieve it.
if (excuterId == null ||
    excuterPvKey == null) {
    throw new Error("Environment variables excuterId and excuterPvKey must be present");
}

const scheduleId = process.env.SCHEDULE_ID;
//Throw a new error if we were unable to retrieve it.
if (scheduleId == null) {
    throw new Error("Environment variables topicId must be present");
}

//Setting-up the client to interact with Hedera Test Network
const client = Client.forTestnet();
client.setOperator(excuterId, excuterPvKey);


async function schduleInfo() {
  // Create the query
  const query = new ScheduleInfoQuery()
    .setScheduleId(scheduleId);

  // Sign with the client operator private key and submit the query request to a node in a Hedera network
  const info = await query.execute(client);

  console.log(info);
  // Convert the timestamp to milliseconds
  const seconds = info.expirationTime.seconds;
  const nanoseconds = info.expirationTime.nanos;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;

  // Create a moment.js object using the milliseconds
  const expirationTime = moment(milliseconds);

  // Format the expiration time to a readable format
  const formattedExpirationTime = expirationTime.format('YYYY-MM-DD HH:mm:ss');

  console.log("Expiration Time:", formattedExpirationTime);
  process.exit();
}

// Call the function
schduleInfo();
