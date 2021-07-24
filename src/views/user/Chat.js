import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import db from '../../Config/db'

const Chat = () => {
    const [Campo, setCampo] = useState("")

    const dispatch = useDispatch()
    const contacto = useSelector(state => state.contacto)
    const User = useSelector(state => state.user)
    const Mensajes = useSelector(state => state.mensajes)
    console.log(Mensajes);

    useEffect(() => {
        const unSubscribe = db.firestore.collection("Mensajes").orderBy("fecha")
        .onSnapshot(
            snapshot => {
                const mensajes = snapshot.docs.map(d =>({id : d.id, ...d.data()}))
                const newMensajes = mensajes.filter(data => data.user === User.id || data.friend === User.id)
                const mensajesContacto = newMensajes.filter(data => data.user === contacto.id || data.friend === contacto.id)
                dispatch({type : "@updateMessages", mensajes : mensajesContacto})
            },
            err => {
                console.log(err);
            }
        )
        return () => unSubscribe
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const sendMessage = (e) => {
        e.preventDefault()
        const mensajeEnviar = {
            fecha : Date.now(),
            friend : contacto.id,
            mensaje : Campo,
            user : User.id
        }
        db.firestore.collection("Mensajes").add(mensajeEnviar)
        document.getElementById("campo").value = ""
    }


    return (
        <div className="p-3" >
            <h3 className="text-white"> {contacto.name} </h3>
            <hr className="w-100 bg-white" />
            <div className="scroll" >
                {Mensajes.map(m => 
                    <div className="p-2 shadow-lg rounded m-3"  key={m.id} >
                        {m.user === User.id ?
                            <div className="d-flex justify-content-end" >
                                <div>
                                    <h5 className="text-white" > {m.mensaje} </h5>
                                    <p className="text-sm text-secondary" > {new Date(m.fecha * 1000).toISOString().substr(11, 8)} </p>
                                </div>
                            </div>
                         :
                            <div>
                                <h5 className="text-purple" > {m.mensaje} </h5>
                                <p className="text-sm text-secondary" > {new Date(m.fecha * 1000).toISOString().substr(11, 8)} </p>
                            </div>
                         }

                    </div>
                )}
            </div>
            <form  onSubmit={sendMessage} className="d-flex justify-content-between" >
                <input id="campo" onChange={(e)=> setCampo(e.target.value) } type="text" className="form-control m-2" placeholder="Hi!" />
                <button type="submit" className="btn btn-outline-light m-2" > Send </button>
            </form>
        </div>
    );
}
 
export default Chat;