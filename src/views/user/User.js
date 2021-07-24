import React,{useState} from 'react'
import { useSelector , useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import db from '../../Config/db';

const User = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [Validacion, setValidacion] = useState(true)
    const [Campos, setCampos] = useState({})

    const validDataUser = async (e) => {
        e.preventDefault()
        const {name,profesion, cel } = Campos
        if(name !== "" && profesion !== "" && cel !== ""){
            const datos = {
                contactos : user.contactos,
                name : name,
                imagen : user.imagen,
                profesion : profesion,
                id : user.id,
                cel : cel
            }
            const consulta = await db.firestore.collection("Usuarios").where("id" , "==" , user.id).get()
            const id = consulta.docs[0].id
            console.log(datos);
            db.firestore.collection("Usuarios").doc(id)
            .update(datos)
            .then(res => {
                dispatch({
                    type : "@uploadDataUser",
                    user : datos
                })
                setValidacion(true)
            })
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacios",
                text : "Recuerda llenar correctamente todos los campos"
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
        <div>
            { Validacion?
                <div className="row" >
                    <div className="col-md-4">
                        <div className="p-3 m-2 d-flex justify-content-center mt-5" >
                            <div className="mx-4" >
                                <h5 className="text-center text-white" > {user.contactos.length} </h5>
                                <p className="text-center  text-white"> Amigos </p>    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex justify-content-center" >
                            <img className="w-50 rounded-circle" src={user.imagen} alt="Agregar imagen" />
                        </div>
                        <div>
                            <h4 className="text-white text-center" > {user.name} </h4>
                            <p className="text-white text-center" > {user.profesion}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 m-2 d-flex justify-content-center mt-5" >
                            <button className="btn btn-outline-light" onClick={()=>  setValidacion(false) }  > Edit </button>
                        </div>
                    </div>
                </div> 
            : 
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 rounded-circle pointer"  onClick={()=>  setValidacion(true) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={validDataUser} >
                            <div className="container" >
                                <div className="w-100 d-flex justify-content-between" >
                                    <input onChange={onChange} className="w-100 mr-2 mt-3 form-control"  name="name" placeholder="Name" />
                                </div>
                                <div className="w-100 d-flex justify-content-between" >
                                    <input onChange={onChange} className="w-100 mr-2 mt-3 form-control" name="profesion" placeholder="Profesion" />
                                    <input onChange={onChange} className="w-100 mr-2 mt-3 form-control"  name="cel"   placeholder="Phone" />
                                </div>
                                <button type="submit" className="btn btn-outline-light shadow-lg w-100 mt-5"> Edit info </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default User;