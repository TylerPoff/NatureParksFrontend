import React, { useState, useEffect } from 'react';
import ParkDataService from '../services/parks';
import ListDataService from '../services/lists';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import "./Park.css";
import "./ParksList.css";

const Park = ({
    user
}) => {

    let params = useParams();

    const[park, setPark] = useState({
        _id: null,
        name: "",
        state: "",
        year: ""
    });
    const[list, setList] = useState([]);

    useEffect(() => {
        const getPark = id => {
            ParkDataService.getPark(id)
                .then(response => {
                    setPark(response.data);
                })
        }
        getPark(params.id);
    }, [params.id]);

    const addToList = async (item) => {
        try {
            const updatedList = [...list, item];
            const data = {
                _id: user.googleId,
                list: updatedList
            }
            ListDataService.updateList(data);
            setList(updatedList);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
        <Container className="main-container">
            <Row className="parkRow">
                <Col>
                    <Card className="parkCard">
                        <Card.Img
                            className="parkView"
                            src={`${park.image}?w=100&h=180`}
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x400?text=No+Image";
                            }}
                        />
                        <Card.Body>
                            <Card.Title className="parkTitle">
                                {park.name}
                            </Card.Title>
                            <Card.Text className="cardText">
                                <strong>State:</strong> {park.state}
                            </Card.Text>
                            <Card.Text className="cardText">
                                <strong>Year Founded:</strong> {park.year}
                            </Card.Text>
                            <Link className="parkLink" to={"/parks"}>
                                Back to Parks List
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='hikeRow'>
                {park.hikes && park.hikes.map((hike, index) => (
                    <Col key={index}>
                        <Card className="hikeCard">
                            <Card.Body>
                                <Card.Title className="hikeTitle">
                                    {hike.hike}
                                </Card.Title>
                                <Button variant="primary" className="addBtn" onClick={() => addToList(hike.hike)}>
                                    +
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className='campRow'>
                {park.camps && park.camps.map((camp, index) => (
                    <Col key={index}>
                        <Card className="campCard">
                            <Card.Body>
                                <Card.Title className="campTitle">
                                    {camp.camp}
                                </Card.Title>
                                <Button variant="primary" className="addBtn" onClick={() => addToList(camp.camp)}>
                                    +
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
    );
}

export default Park;