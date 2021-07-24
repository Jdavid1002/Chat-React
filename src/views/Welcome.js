import React from 'react'
import chat from '../img/chat.svg'

const Welcome = () => {
    return (
        <div className="container my-5" >
            <div className="p-3" >
                <h1 className="text-center" > <strong> Communicate with <span className="text-green" > your friends </span> quickly and easily with just a couple of clicks </strong> </h1>
                <p className="text-center mt-3" > <strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, ipsum eaque! Nemo voluptatem porro quam accusamus veritatis sapiente ab amet temporibus facilis repudiandae asperiores quo, fuga, aspernatur fugit adipisci! Accusamus. </strong> </p>
            </div>
            <div className="d-flex justify-content-center" >
                <img className="w-50" src={chat} alt="lorem5" />
            </div>
        </div>
    );
}
 
export default Welcome;