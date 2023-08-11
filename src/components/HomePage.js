import React from 'react';
import { Link } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="App">
            <div className='homeCenter'>
                <h1 className='welcomeText' >Welcome to The Parks</h1>
                <Link to="/parks" className='startText'>
                    View Parks
                </Link>
            </div>
        </div>
    )
}


export default HomePage;