const axios = require('axios');
const express = require('express');
const router = express.Router();

/**
 * Configure axios instance with headers.
 * Use this instance for sending HTTP request to another API. 
 * 
 * Set the following headers.
 *      X-Api-Key: the api key issued by BBC API.
 */
let x_api_key = 'ca503f961822472b8c20b42fae6db557'
const axiosInstance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        'X-Api-Key': x_api_key
    }
});


// headlines.
router.get('/headlines', function(req, res, next) {
    let country = req.query.country;

    axiosInstance.get(`/top-headlines?country=${country}`)
    .then(resolve => {
        res.send(resolve.data);
    })
    .catch(reject => {
        res.send(reject);
    });
});

module.exports = router;
