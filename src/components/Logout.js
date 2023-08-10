import React from 'react';
import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Logout({ setUser, clientId }) {
    
    const navigate = useNavigate();
    
    const onClick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        navigate("/");
        console.log('Logout made successfully');
    };

    return (
        <div>
            <Button
                variant='light'
                onClick={onClick}
                >Logout</Button>
        </div>
    );
}

export default Logout;