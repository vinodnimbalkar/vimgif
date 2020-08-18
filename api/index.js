const axios = require("axios");
require("dotenv").config()
const gifData = require("./vim");


async function getVimGif(_, res) {
    try {
        let awsurl = gifData[Math.floor(Math.random() * gifData.length)];
        const response = await axios.get(`${process.env.URL}/${awsurl}`, {
            method: 'GET',
            responseType: 'arraybuffer'
        });
        const file = await Buffer.from(response.data, 'binary');
        res.setHeader('Content-Type', 'image/gif');
        res.send(file);
    } catch (error) {
        res.status(500);
        const response = error.response || {};
        res.send({
            message: error.message,
            response
        })
    }
}

module.exports = getVimGif;