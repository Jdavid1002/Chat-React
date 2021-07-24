import React from 'react'
import { useSelector,useDispatch } from 'react-redux';

const PerfilFriends = ({user}) => {

    const dispatch = useDispatch()
    const User = useSelector(state => state.user)

    const sendMessage = () => {
        dispatch({
            type : "@sendMessage",
            number : 3,
            contacto : user,
            user : User
        })
    }

    return (
        <div className="row" >
            <div className="col-md-4">
                <div className="p-3 m-2 d-flex justify-content-center mt-5" >
                    <div className="mx-4" >
                        <h5 className="text-center text-white" > {user.contactos} </h5>
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
            <div className="col-md-4 d-flex align-items-center justify-content-center">
                <button className="btn btn-outline-light" onClick={sendMessage} > Send Message </button>
            </div>

        </div> 
    );
}
 
export default PerfilFriends;