import React,{useEffect} from 'react';
import Navbar from './views/Navbar';
import Footer from './views/Footer';
import Rutas from './Config/router';
import {useDispatch} from 'react-redux'
import firebase from 'firebase';
import db from './Config/db.js'

function App() {

  const dispatch = useDispatch()

  const searchSesionUser = () => {
    firebase.auth().onAuthStateChanged( async (user) => {
      if(user){
        const id = user.uid
        const data = await db.firestore.collection("Usuarios").where("id", "==" , id ).get()
        const datos = {
            id : data.docs[0].data().id ,
            contactos :data.docs[0].data().contactos === undefined ? [] : data.docs[0].data().contactos, 
            name : data.docs[0].data().name,
            imagen : data.docs[0].data().imagen === "" ? "http://simpleicon.com/wp-content/uploads/user1.png" :data.docs[0].data().imagen,
            profesion : data.docs[0].data().profesion
        }

        dispatch({
          type : "@addDatauser",
          user : datos
        })

      }else{
        dispatch({
          type : "@addDatauser",
          user : false
        })
      }
    })
  }

  useEffect(() => {
    searchSesionUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Navbar />
      <Rutas />
      <Footer />
    </div>
  );
}

export default App;