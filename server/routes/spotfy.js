const express = require("express");
const router = express.Router();

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
    grant_type: 'client_credentials'
    } ,
    json: true
};

router.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    var token = body.access_token;
    console.log(token);
    }
});

module.exports = router;
