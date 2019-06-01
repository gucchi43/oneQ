import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDlMpLGVzjnPyLlx5f7q8p9_aNNrjtqpVA",
      authDomain: "oneq-7af56.firebaseapp.com",
      databaseURL: "https://oneq-7af56.firebaseio.com",
      projectId: "oneq-7af56",
      storageBucket: "oneq-7af56.appspot.com",
      messagingSenderId: "750210672673",
      appId: "1:750210672673:web:b1daeead4aedeb00"
    }
  )
}

export default firebase
