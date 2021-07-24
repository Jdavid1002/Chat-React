import React from 'react'
import Menu from './Menu'
import { useSelector } from 'react-redux';
import Friends from './Friends';
import User from './User';
import Messages from './Messages';

const Dashboard = () => {

    const number = useSelector(state => state.number)

    return (
        <div className="bg-dark-two px-5" >
            <div className="row" >
                <div className="col-md-1 d-flex align-items-center" >
                    <Menu />
                </div>
                <div className="col-md-11 shadow-lg menu-interfaz" >
                    { number === 1? <User /> : null}
                    { number === 2? <Friends/> : null}
                    { number === 3? <Messages/>: null}
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;