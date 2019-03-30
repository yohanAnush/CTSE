const admin = require('firebase-admin');
const credentials = require('./ctse-news-headlines-firebase-adminsdk-gncao-ae3279eeb7.json');

// Initialize the db.
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: 'https://ctse-news-headlines.firebaseio.com',
});
let db = admin.firestore();

/**
 * Saves the given data(JSON data) to Cloud FireStore.
 * Since FireStore functions are asynchronous, we have to use a promise to handle
 * event(s).
 *
 * @param {String} collectionName: Name of the collection in FireStore.
 * @param {String} identifier: Sort of like the primary key that identifies our entry/document.
 * @param {Object} data: A JSON object that contains data.
 * @returns {Promise}
 */
let saveToCollection = (collectionName, identifier, data) => {
  return new Promise((resolve, reject) => {
    var documentReference = db.collection(collectionName).doc(identifier);

    documentReference
      .set(data)
      .then(event => {
        resolve(event);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Retrieves a document/entry from FireStore.
 *
 * @param {String} collectionName: Name of the collection in FireStore.
 * @param {String} identifier: Sort of like the primary key that identifies our entry/document.
 * @returns {Object}
 */
let getFromCollection = (collectionName, identifier) => {
  return new Promise((resolve, reject) => {
    var documentReference = db.collection(collectionName).doc(identifier);

    documentReference
      .get()
      .then(document => {
        if (!document.exists) {
          console.log('Document does not exists');
          reject({});
        } else {
          resolve(document.data());
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Retrieves all entries/documents in a collection.
 * Originally, the FireStore function will return a snapshot, which is a set of,
 * documents. To access data in each document use,
 * obj.data() method.
 *
 * @param {String} collectionName: Name of the collection in FireStore.
 * @returns {Array}
 */
let getAllFromCollection = collectionName => {
  return new Promise((resolve, reject) => {
    var documentReference = db.collection(collectionName);

    documentReference
      .get()
      .then(snapshot => {
        // snapshot is a collection of documents.
        // use .data() method to get data of each document.
        users = [];
        snapshot.forEach(document => {
          users.push(document.data());
        });

        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = { saveToCollection, getFromCollection, getAllFromCollection };
