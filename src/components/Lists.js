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

    const deleteList = async () => {
        if(user && user.googleId) {
            try {
                await ListDataService.deleteList(user.googleId);
                setLists([]);
            } catch(error) {
                console.error(error);
            }
        }
    }

    const deleteItem = async (index) => {
        if(user && user.googleId) {
            try {
                const updatedList = [...lists];
                updatedList.splice(index, 1);
                await ListDataService.deleteListItem(user.googleId, index);
                setLists(updatedList);
            } catch(error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if(user && user.googleId) {
            ListDataService.getLists(user.googleId)
                .then(response => {
                    setLists(response.data.list);
                })
                .catch(error => {
                    setLists([]);
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
                                <Button variant="danger" className="deleteListBtn" onClick={deleteList}>
                                    Delete Entire List
                                </Button>
                                <Row className="listRow">
                                    {lists.map((list, index) => (
                                        <Col key={index} className="listColumn" sm={4}>
                                            <Card className="listCard">
                                                <Card.Body>
                                                    <Card.Title>{list}</Card.Title>
                                                    <Button variant="danger" className="minusBtn" onClick={() => deleteItem(index)}>
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