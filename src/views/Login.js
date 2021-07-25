import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import 'firebase/auth';
import { useFirebaseApp} from 'reactfire';


const Login = () => {

    const firebase = useFirebaseApp();
    const [Campos, setCampos] = useState({
        email : "",
        pass : ""
    })

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const iniciarSesion = (e) => {
        e.preventDefault()
        const {email, pass} = Campos
        if(email !== "" && pass !== ""){
            firebase.auth().signInWithEmailAndPassword(email , pass)
            .then(res => {
                window.location.replace("/Chat-React/#/Dashboard")
            }).catch(error => {
                Swal.fire({
                    icon : 'error',
                    title : "Ocurrió un error",
                    text : "Tus credenciales son incorrectas o no estas registrado."
                })
            })
        }else{
            Swal.fire({
                icon :"warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar correctamente todos los campos."
            })
        }
    }

    return (
        <div className="container my-5" >
            <div className="row shadow-lg rounded" >
                <div className="col-md-4" >
                    <div className="p-4" > 
                        <h3> <strong>  We are glad to have you back </strong> </h3>
                        <form onSubmit={iniciarSesion} >
                            <div>
                                <p className="text-sm" > <strong> WELCOME TO CHAT-REACT </strong> </p>
                            </div>
                            <TextField onChange={onChange} type="text" name="email" className="w-100 my-2" label="Email" variant="outlined" />
                            <TextField onChange={onChange} type="password" name="pass" className="w-100 my-2" label="Password" variant="outlined" />
                            <button className="btn btn-outline-dark w-100 my-2"> Sign In </button>
                        </form>
                        <div>
                            <hr />
                            <p> You do not have an account?<span className="pointer text-purple" onClick={()=> window.location.replace("/Chat-React/#/Register") } > Sign Up </span> </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 img-banner-login" >
                </div>
            </div>
        </div>
    );
}
 
export default Login;