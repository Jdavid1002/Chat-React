import React,{useEffect, useState} from 'react'
import db from '../../Config/db.js'
import { useSelector , useDispatch} from 'react-redux'
import Swal from 'sweetalert2'

const AddFriend = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [listaUsuarios, setlistaUsuarios] = useState([])

    const cargarUsuarios= async () => {
        let arregloPersonas = []
        const consulta = await db.firestore.collection("Usuarios").where("id" , "!=" ,user.id ).get()
        if(consulta.docs.length > 0){
            consulta.docs.forEach(element => {
                const datos = {
                    id : element.data().id ,
                    contactos : element.data().contactos.length, 
                    name : element.data().name,
                    imagen : element.data().imagen ,
                    profesion : element.data().profesion
                }
                arregloPersonas.push(datos)
            })
            setlistaUsuarios(arregloPersonas)
        }else{
            setlistaUsuarios([])
        }
    }


    useEffect(() => {
        cargarUsuarios()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToFriend = async (friend) => {
        const validacion = user.contactos.find(data => data.id === friend.id)
        if(!validacion){
            user.contactos.push(friend)
            const consulta = await db.firestore.collection("Usuarios").where("id" , "==" , user.id).get()
            const id = consulta.docs[0].id
            db.firestore.collection("Usuarios").doc(id)
            .update(user)
            .then(res => {
                dispatch({
                    type : "@uploadDataUser",
                    user : user
                })
                window.location.reload()
            })
        }else{
            Swal.fire({
                icon : "error",
                title : "No puedes agregar a este usuario",
                text : "Ya tienes agregado a este usuario en tu lista de contactos"
            })
        }
    }

    return (
        <div className="scroll" >
            {listaUsuarios.map(data => 
                <div className="mt-4 pointer chat-container w-75" key={data.id}>
                    <div className="row" >
                        <div className="col-md-3 d-flex justify-content-center">
                            <img className="w-50 rounded" src={data.imagen} alt="" />
                        </div>
                        <div className="col-md-4" >
                            <h6 className="text-white" > {data.name} </h6>
                            <p className="text-sm text-white" > {data.profesion} </p>
                        </div>
                        <div className="col-md-5" >
                            <button className="btn btn-outline-light" onClick={()=> addToFriend(data) } > Add To friend </button>
                        </div>
                    </div>
                    <hr className="bg-white" />
                </div>       
            )}
        </div>
    );
}
 
export default AddFriend;