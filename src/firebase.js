import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';

var config = {
  apiKey: "AIzaSyDVs10hAUStxGmb_TxSEIR7iW78NyqwVKE",
  authDomain: "stock-app-b7556.firebaseapp.com",
  databaseURL: "https://stock-app-b7556.firebaseio.com",
  projectId: "stock-app-b7556",
  storageBucket: "stock-app-b7556.appspot.com",
  messagingSenderId: "174869200663"
};

firebase.initializeApp(config);
var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();
var userId;

firebase.auth().signInWithPopup(provider).then(result => {
  userId = result.user.uid;
  db.collection("users").doc(userId).update({
    symbols: firebase.firestore.FieldValue.arrayUnion('banan')
  });
  db.collection("users").doc(userId).get().then(doc => {
    console.log(doc.data());
  });

  // ...
}).catch(error => {
  console.log(error);
  alert(error.message);
});

export function addSymbolToDatabase(symbol) {
  db.collection("users").doc(userId).update({
    symbols: firebase.firestore.FieldValue.arrayUnion(symbol)
  });
}

export function deleteSymbolFromDatabase(symbol) {
  db.collection("users").doc(userId).update({
    symbols: firebase.firestore.FieldValue.arrayRemove(symbol)
  });
}