import React from 'react'
import { useSelector , useDispatch} from 'react-redux';
import Chat from './Chat';
import db from '../../Config/db';

const Messages = () => {

    const user = useSelector(state => state.user)
    const contacto = useSelector(state => state.contacto)

    const dispatch = useDispatch()

    const sendMessage = (datos) => {
        db.firestore.collection("Mensajes").orderBy("fecha")
        .onSnapshot(
            snapshot => {
                const mensajes = snapshot.docs.map(d =>({id : d.id, ...d.data()}))
                const newMensajes = mensajes.filter(data => data.user === user.id || data.friend === user.id)
                const mensajesContacto = newMensajes.filter(data => data.user === datos.id || data.friend === datos.id)
                dispatch({type : "@updateMessages", mensajes : mensajesContacto})
            },
            err => {
                console.log(err);
            }
        )
        dispatch({
            type : "@sendMessage",
            number : 3,
            contacto : datos
        })
    }

    return (
            <div className="row" >
                <div className="col-md-4">
                    <div className="p-3" >
                        <div className="d-flex justify-content-between" >
                            <h6 className="text-white mt-2" > Chats </h6>
                        </div>

                        {user.contactos.map(data => 
                            <div className="mt-4 pointer chat-container" key={data.id} onClick={()=> sendMessage(data) } >
                                <div className="d-flex justify-content-start" >
                                    <div className="w-25" >
                                        <img className="w-75 rounded" src={data.imagen} alt="" />
                                    </div>
                                    {contacto.id === data.id ?  
                                        <div>
                                            <h6 className="text-purple" > {data.name} </h6>
                                            <p className="text-sm text-purple" > {data.profesion} </p>
                                        </div> 
                                    :
                                        <div>
                                            <h6 className="text-white" > {data.name} </h6>
                                            <p className="text-sm text-white" > {data.profesion} </p>
                                        </div>
                                    }
                                </div>
                                {contacto.id === data.id ? 
                                    <hr className="bg-purple" /> 
                                :
                                    <hr className="bg-white" />
                                }
                            </div>    
                        )}

                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-3" >
                        {JSON.stringify(contacto) === '{}' ? <div>  </div> : <Chat />  }
                    </div>
                </div>
            </div>
    );
}
 
export default Messages;