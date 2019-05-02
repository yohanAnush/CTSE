/**
 * Handles password hashing and authentication of a password.
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;

let hashPassword = (plainTextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
        });
    });
};

module.exports = { hashPassword };