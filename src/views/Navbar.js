import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {

    const user = useSelector(state => state.user)

    return (
        <div>
            {user ? 
                <div className="px-5 bg-dark-two p-4" >
                    <div className="row" >
                        <div className="col-md-1" >
                            <div className="d-flex justify-content-center pt-1" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="pointer text-white bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-md-8" >
                            <div className="d-flex justify-content-start mt-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-purple bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                                <h4 className="text-white ml-3" > Messaging  </h4>
                            </div>
                        </div>
                        <div className="col-md-3" >
                            <div className="d-flex justify-content-center" >
                                <div className="m-2" >
                                    <form>  
                                        <input type="text" className="form-control" placeholder="Search" />
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="px-5 bg-light p-2 shadow" >
                    <div className="row" >
                        <div className="col-md-2" >
                            <div className="d-flex justify-content-center pt-1" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="pointer bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="col-md-8" >
                            <h1 onClick={()=> window.location.replace("/Chat-React/#/") } className="text-center h3 pt-2 pointer"> <strong> Chat-React </strong> </h1>
                        </div>
                        <div className="col-md-2" >
                            <div className="d-flex justify-content-center" >
                                <button  onClick={()=> window.location.replace("/Chat-React/#/Login") } className="btn btn-outline-dark m-2" > Sign In </button>
                                <button  onClick={()=> window.location.replace("/Chat-React/#/Register") } className="btn btn-dark m-2" > Sign Up </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Navbar;