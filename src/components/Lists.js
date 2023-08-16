import React, { useState, useEffect} from 'react';
import TripDataService from '../services/trips';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "./Lists.css";
import "./ParksList";

const Lists = ({
    user
}) => {

    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState('');

    return(
        <div className="App">
            <Container className="main-container">
                {user ? (
                    <div className="userGreet">
                        <h1 className="nullText">
                            Hello, {user.name}
                        </h1>
                        <div className="listContainer">
                            
                        </div>
                    </div>
                ) : (
                    <div className="nullCenter">
                        <h1 className="nullText">
                            Please login to use this functionality
                        </h1>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Lists;