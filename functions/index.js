const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://masterapi-5d181.firebaseio.com"
});

const db = firebase.database();
const ref = db.ref('/assistant');
const childRef = ref.child('technical');

exports.api = functions.https.onRequest((request, response) => {
  response.header('Content-Type', 'application/json');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Header', 'Contet-Type');
  const data = firebase.database().ref('/assistant').child('technical');
  if (request.method === 'GET') {
    data.on('value', (snapshot) => {
      const parseData = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
      response.json(parseData);
    });
  } else {
    response.status(500).send('No tienes permisos');
  }
});

exports.saveData = functions.https.onRequest((request, response) => {
  if (request.method === 'POST') {
    console.log(request.body);
    const saveData = childRef.push();
    saveData.set(request.body);
    response.status(200).send('Datos Recibidos');
  } else {
    response.status(500).send('No tienes permisos');
  }
});

exports.savePhoto = functions.https.onRequest((request, response) => {
  if (request.method === 'POST') {
    console.log(request.body);

    response.status(200).send('Datos Recibidos');
  } else {
    response.status(500).send('No tienes permisos');
  }
});