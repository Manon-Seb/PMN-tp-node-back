const baseUrl = "https://api.spacexdata.com/v3/";

const axios = require('axios');

exports.getLastMission = async () => {
    let response = await axios.get(baseUrl + "missions?limit=1");
    return response.data[0];
}

exports.getLastLaunche = async () => {
    let response = await axios.get(baseUrl + "launches?limit=1");
    return response.data[0];
}