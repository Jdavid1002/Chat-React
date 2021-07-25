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
            <div className="row shadow-lg rounded" >
                <div className="col-md-5 img-banner-register">

                </div>
                <div className="col-md-7">
                    <div className="p-3" >
                        <form onSubmit={validDataUser} >
                            <div>
                                <p className="text-sm" > <strong> START TO FREE </strong> </p>
                                <h3> <strong> Create an account </strong> </h3>
                                <hr className="line w-75 bg-purple" />
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
                            <h6> Do you already have an account? <span className="text-purple pointer" onClick={()=> window.location.replace("/Chat-React/#/Login") } > login here </span> </h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;