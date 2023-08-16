import React, { useState, useEffect, useCallback } from 'react';
import TripDataService from '../services/trips';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

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
            const tripId = uuidv4();
            const data = {
                _id: user.googleId,
                trips: {
                        _id: tripId,
                        tripTitle,
                        location,
                        favoriteMemory,
                        summary
                    }
            };

            const response = await TripDataService.updateTrip(data);

            TripDataService.getTrips(user.googleId)
                .then(response => {
                    setTrips(response.data.trips);
                })

            setTripTitle('');
            setLocation('');
            setFavoriteMemory('');
            setSummary('');
        } catch(error) {
            console.log(error);
        }
    };

    const deleteTrip = async (tripId) => {
        try {
            await TripDataService.deleteTrip(tripId)
                .then(() => {
                    const updatedTrips = trips.filter((trip) => trip._id !== tripId);
                    setTrips(updatedTrips);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (user && user.googleId) {
            TripDataService.getTrips(user.googleId)
              .then(response => {
                setTrips(response.data.trips);
              })
              .catch(e => {
                console.log(e);
              });
          }
    }, [user]);
    
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
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                                <textarea 
                                    placeholder="Favorite Memory"
                                    value={favoriteMemory}
                                    onChange={(e) => setFavoriteMemory(e.target.value)}
                                />
                                <Button className="submitBtn" onClick={submitTrip}>
                                    Submit
                                </Button>
                            </div>
                        )}
                        <div className="tripList">
                        {trips.map((trip, index) => (
                        <Card key={trip._id} className="tripCard">
                            <Card.Body>
                                <Card.Title className="tripTitle">
                                    {trip.tripTitle}
                                </Card.Title>
                                <Card.Text className="tripText">
                                    <strong>Location:</strong> {trip.location}
                                </Card.Text>
                                <Card.Text className="tripText">
                                    <strong>Summary</strong> {trip.summary}
                                </Card.Text>
                                <Card.Text className="tripText">
                                    <strong>Favorite Memory:</strong> {trip.favoriteMemory}
                                </Card.Text>
                                <Button variant="danger" className="deleteBtn" onClick={() => deleteTrip(trip._id)}>
                                    Delete Trip
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
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

export default Trips;