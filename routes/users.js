const express = require('express');
const db = require('../database/firebase.js');
const router = express.Router();

/* GET all users. */
router.get('/', (req, res, next) => {
  db.getAllFromCollection('Users')
    .then(data => {
      res.status(200).send({ Message: data });
    })
    .catch(reject => {
      res.status(404).send({ Message: reject });
    });
});

/* GET specific user. */
router.get('/:firstName', (req, res, next) => {
  db.getFromCollection('Users', req.params.firstName)
    .then(data => {
      res.status(200).send({ Message: data });
    })
    .catch(reject => {
      res.status(404).send({ Message: reject });
    });
});

/* ADD specific user. */
router.post('/', (req, res, next) => {
  db.saveToCollection('Users', req.body.FirstName, req.body)
    .then(event => {
      res.status(201).send({ Message: 'User created.', Transaction: event });
    })
    .catch(reject => {
      res.status(400).send({ Message: 'Failed to add user.', Error: reject });
    });
});

module.exports = router;
