import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import { useFirebaseApp } from 'reactfire';
import db from '../Config/db.js'
import firebase from 'firebase';

const Register = () => {

    const fb = useFirebaseApp();
    const [Campos, setCampos] = useState({})

    const validDataUser = (e) => {
        e.preventDefault()
        const IMG = document.getElementById("IMG").files
        const {email, pass1, pass2, cel, firstname, lastname, profesion} = Campos
        if(email !== "" && pass1 !== "" && pass2 !== "" && cel !== "" && firstname !== "" && lastname !=="" && profesion !== ""){
            if(pass1 === pass2 && pass1.length > 5){
                if(IMG.length > 0 ){
                    const storage = firebase.storage().ref(`/IMG-USUARIOS/${IMG[0].name}`)
                    const task = storage.put(IMG[0])
                    task.on('state_changed' , ()=> {
        
                    }, error =>{
                        console.log(error);
                    }, () => {
                        task.snapshot.ref.getDownloadURL().then((dato) => {
                            fb.auth().createUserWithEmailAndPassword(email, pass1).then((res)  => {
                                const Datos = {
                                    id : res.user.uid,
                                    name : `${firstname} ${lastname}`,
                                    contactos : [],
                                    mensajes : [] ,
                                    imagen : dato,
                                    profesion : profesion,
                                    cel : cel
                                }
                                db.firestore.collection("Usuarios").doc().set(Datos)
                                window.location.replace("/Chat-React/#/Dashboard")
                            })
                        })
                    })
                }else{
                    Swal.fire({
                        icon :"warning",
                        title : "Imagen Invalida",
                        text : "Recuerda usar un archivo tipo imagen"
                    })
                }
            }else{
                Swal.fire({
                    icon :"warning",
                    title : "Contraseñas incorrectas",
                    text : "Recuerda llenar ambos campos con contraseñas iguales y de más de 6 digitos."
                })
            }
        }else{
            Swal.fire({
                icon :"warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar correctamente todos los campos."
            })
        }
    }

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="container my-5" >
            <div className="row" >
                <div className="col-md-6">
                    <div className="p-3 bg-dark h-100" >

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-3" >
                        <form onSubmit={validDataUser} >
                            <div>
                                <p className="text-sm" > <strong> START TO FREE </strong> </p>
                                <h3> <strong> Create an account </strong> </h3>
                                <hr className="line w-75 bg-green" />
                            </div>
                            <div>
                                <div className="w-100 d-flex justify-content-between" >
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3" name="firstname" label="First Name" />
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3" name="lastname" label="Last Name" />
                                </div>
                                <div className="w-100 d-flex justify-content-between" >
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3" name="profesion" label="Profesion" />
                                </div>
                                <div className="w-100 d-flex justify-content-between" >
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3"  name="email" label="Email" />
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3"  name="cel" label="Phone" />
                                </div>
                                <div className="w-100 d-flex justify-content-between" >
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3" type="password"  name="pass1" label="Password" />
                                    <TextField onChange={onChange} className="w-100 mr-2 mt-3" type="password"  name="pass2" label="Confirm Password" />
                                </div>
                                <div className="mt-3" >
                                    <h6> <strong> Perfil Photo </strong> </h6>
                                    <input type="file" className="w-100 mr-2 form-control" id="IMG" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-dark shadow-lg w-100 mt-5"> Sign Up </button>
                        </form>

                        <div className="mt-4" >
                            <h6> Or you can join with </h6>
                            <div className="d-flex justify-content-start " >
                                <div className="shadow p-3 m-2 rounded-circle pointer bg-dark" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-white bi bi-google" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                    </svg>
                                </div>
                                <div className="shadow p-3 m-2 rounded-circle pointer bg-dark" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-white bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;