import { createStore } from "redux"

const initialState={
    user : false,
    contacto : {},
    number : 1,
    mensajes : []
}

const reducer = (state = initialState , action) => {
    const {type, user, number, contacto , mensajes} = action
 
    if(type === "@addDatauser"){
        return {
            ...state,
            user : user
        }
    }

    if(type === "@changeNumberInterfaz"){
        return {
            ...state,
            number : number
        }
    }

    if(type === "@uploadDataUser"){
        return{
            ...state,
            user : user
        }
    }

    if(type === "@sendMessage"){
        return{
            ...state,
            number : number,
            contacto : contacto,
        }   
    }

    if(type === "@exit"){
        return {
            ...state,
            user : false,
            contacto : {},
            number : 1,
            mensajes : []
        }
    }

    if(type === "@updateMessages"){
        return{
            ...state,
            mensajes : mensajes
        }   
    }

       
    return state
}


export default 
createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)