import React, { useState, useEffect } from 'react';
import TripDataService from '../services/trips';
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

    const [trips, setTrips] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [tripTitle, setTripTitle] = useState('');
    const [location, setLocation] = useState('');
    const [favoriteMemory, setFavoriteMemory] = useState('');
    const [summary, setSummary] = useState('');

    const submitTrip = async() => {
        if(!tripTitle || !location || !favoriteMemory || !summary) {
            console.log('Please fill out all fields');
            return;
        }
        try {
            const data = {
                _id: user.googleId,
                trips: {
                        tripTitle,
                        location,
                        favoriteMemory,
                        summary
                    }
            };

            const response = await TripDataService.updateTrip(data);
            setTripTitle('');
            setLocation('');
            setFavoriteMemory('');
            setSummary('');
        } catch(error) {
            console.log(error);
        }
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    
    return (
        <div className="App">
            <Container className="main-container">
                {user ? (
                    <div className="userGreet">
                        <h1 className="nullText">
                            Hello, {user.name} 
                        </h1>
                        <div className="logLink">
                            <Button className="submitBtn" onClick={toggleCollapse}>
                                {collapsed ? 'Show Submission Form' : 'Hide Submission Form'}
                            </Button>
                        </div>
                        {!collapsed && (
                            <div className="textField">
                                <input
                                    type="text"
                                    placeholder="Trip Title"
                                    value={tripTitle}
                                    onChange={(e) => setTripTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <textarea
                                    placeholder="Summary"
                                    value={favoriteMemory}
                                    onChange={(e) => setFavoriteMemory(e.target.value)}
                                />
                                <textarea 
                                    placeholder="Favorite Memory"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                                <Button className="submitBtn" onClick={submitTrip}>
                                    Submit
                                </Button>
                            </div>
                        )}
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