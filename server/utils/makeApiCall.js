const axios = require('axios');

async function makeApiCall(url, method = 'GET', data = null, headers = {}) {
  console.log("Info : makeApiCall function called");
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });
    return response;
  } catch (error) {
    console.log(`Error : ${url} API call Failed`);
    throw error;
  }
}
module.exports=makeApiCall

