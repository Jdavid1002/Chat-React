import firebase from "firebase/app"
import 'firebase/firestore'

const confi = {
    apiKey: "AIzaSyChuOjk0mCXm7R_qENFkjJW1VXFDNwHis0",
    authDomain: "chat-react-redux-1d035.firebaseapp.com",
    projectId: "chat-react-redux-1d035",
    storageBucket: "chat-react-redux-1d035.appspot.com",
    messagingSenderId: "905866831452",
    appId: "1:905866831452:web:d5b30d55483cba44fba899"
};

const fb = firebase.initializeApp(confi);

const db = {
  Config : confi,
  firestore : fb.firestore()
}

export default db