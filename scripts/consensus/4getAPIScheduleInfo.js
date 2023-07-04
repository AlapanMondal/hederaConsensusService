const axios = require('axios');
const moment = require('moment');
require('dotenv').config({ path: "../../.env" });

const scheduleId = process.env.SCHEDULE_ID;

if (scheduleId == null) {
  throw new Error("Environment variable SCHEDULE_ID must be present");
}

async function callAPI() {
  let result;
  try {
    const apiUrl = `https://testnet.mirrornode.hedera.com/api/v1/schedules/${scheduleId}`;
    const response = await axios.get(apiUrl);
    result = response.data;

    console.log('Consensus Timestamp:', moment.unix(parseFloat(result.consensus_timestamp)).format('YYYY-MM-DD HH:mm:ss'));
    console.log('Expiration Time:', moment.unix(parseFloat(result.expiration_time)).format('YYYY-MM-DD HH:mm:ss'));

    if (result.executed_timestamp === null) {
      console.log('Status: Pending for required signatures');
    } else {
      console.log('Executed Timestamp:', moment.unix(parseFloat(result.executed_timestamp)).format('YYYY-MM-DD HH:mm:ss'));
    }
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit();
}


callAPI();
 