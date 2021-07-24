import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import AddFriend from './addFriend'
import PerfilFriends from './perfilFriends'

const Friends = () => {
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [datosUsuario, setdatosUsuario] = useState({})

    const user = useSelector(state => state.user)

    const cambiarInterfaz = (number, data) => {
        setnumeroInterfaz(number)
        setdatosUsuario(data)
    }

    return (
        <div>
            <div className="row" >
                <div className="col-md-4">
                    <div className="p-3" >
                        <div className="d-flex justify-content-between" >
                            <h6 className="text-white mt-2" > Friends </h6>
                            {/* <input type="text"  className="ml-5 form-control" placeholder="Search Friends" /> */}
                        </div>

                        <div className="mt-4 pointer chat-container" onClick={()=> cambiarInterfaz(1 , {}) } >
                            <div className="d-flex justify-content-center" >
                                <h2 className="text-white" > + </h2>
                            </div>
                            <hr className="bg-white" />
                        </div>

                        {user.contactos.map(data => 
                            <div className="mt-4 pointer chat-container" key={data.id} onClick={()=> cambiarInterfaz(2 , data) } >
                                <div className="d-flex justify-content-start" >
                                    <div className="w-25" >
                                        <img className="w-75 rounded" src={data.imagen} alt="" />
                                    </div>
                                    <div>
                                        <h6 className="text-white" > {data.name} </h6>
                                        <p className="text-sm text-white" > {data.profesion} </p>
                                    </div>
                                </div>
                                <hr className="bg-white" />
                            </div>    
                        )}

                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-3" >
                        {numeroInterfaz === 1 ? <AddFriend /> : null}
                        {numeroInterfaz === 2 ? <PerfilFriends user={datosUsuario} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Friends;