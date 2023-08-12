import React, { useState, useEffect } from 'react';
import ParkDataService from '../services/parks';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import "./Trips.css";
import "./ParksList";

const Trips = ({
    user
}) => {
    
    return (
        <div className="App">
            <Container className="main-container">
                {user ? (
                    <div>

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

export default Trips;