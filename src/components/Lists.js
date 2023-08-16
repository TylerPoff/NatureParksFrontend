import React, { useState, useEffect} from 'react';
import ListDataService from '../services/lists';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "./Lists.css";
import "./ParksList";

const Lists = ({
    user
}) => {

    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState('');

    useEffect(() => {
        if(user && user.googleId) {
            ListDataService.getLists(user.googleId)
                .then(response => {
                    setLists(response.data.list);
                })
        }
    }, [user])

    return(
        <div className="App">
            <Container className="main-container">
                {user ? (
                    <div className="userGreet">
                        <h1 className="nullText">
                            Hello, {user.name}
                        </h1>
                        <div className="listContainer">
                            <div>
                                <h2>Your Bucketlist: </h2>
                                <Row className="listRow">
                                    {lists.map((list, index) => (
                                        <Col key={index} className="listColumn" sm={4}>
                                            <Card className="listCard">
                                                <Card.Body>
                                                    <Card.Title>{list}</Card.Title>
                                                    <Button variant="danger" className="minusBtn">
                                                        -
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
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