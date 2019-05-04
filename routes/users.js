/**
 * Responsible for handling user related tasks such as,
 *    Create new user.
 *    Retrieve user details.
 *    Handling user login/logout.
 */
const express = require('express');
const authentication = require('../commons/authenticate.js');
const db = require('../database/firebase.js');
const router = express.Router();

/* GET all users. */
router.get('/', (req, res, next) => {
  db.getAllFromCollection('Users')
    .then(data => { res.status(200).send({ Message: data }); })
    .catch(reject => { res.status(404).send({ Message: reject }); });
});

/* GET specific user. */
router.get('/:username', (req, res, next) => {
  db.getFromCollection('Users', req.params.username)
    .then(data => { res.status(200).send({ Message: data }); })
    .catch(reject => { res.status(404).send({ Message: reject }); });
});

/* ADD specific user. */
router.post('/', (req, res, next) => {
  // hash password before storing in DB.
  authentication.hashPassword(req.body.password)
  .then(hashedPassowrd => {
    req.body.password = hashedPassowrd;
    // save user only if password is hashed properly.
    db.saveToCollection('Users', req.body.username, req.body)
    .then(event => { res.status(201).send({ Message: 'User created.', Transaction: event }); })
    .catch(reject => { res.status(400).send({ Message: 'Failed to add user.', Error: reject }); });
  })
  .catch(reject => { res.status(400).send({ Message: 'Failed to accept provided password.', Error: reject }); })
  
});

/* Login */
router.post('/login', (req,res,next) => {
  let username = req.body.username;
  let plainTextPassword = req.body.password;

  db.getFromCollection('Users', username)
  .then(data => {
    authentication.validatePassword(plainTextPassword, data.password)
    .then(validity => { res.status(200).send({ Message: { Authentication: validity } }); })
    .catch(invalidity => { res.status(200).send({ Message: { Authentication: invalidity } }); })
  })
  .catch(reject => { res.status(403).send({ Message: { Authentication: false } }); });
})

module.exports = router;
