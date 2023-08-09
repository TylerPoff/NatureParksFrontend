import React, { useState, useEffect, useCallback } from 'react';
import ParkDataService from "../services/parks";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "./ParksList.css";

const ParksList = props => {
    
    const [parks, setParks] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchState, setSearchState] = useState("");
    const [states, setStates] = useState(["All States"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    const retrieveStates = useCallback(() => {
        ParkDataService.getStates()
            .then(response => {
                setStates(["All States"].concat(response.data))
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const retrieveParks = useCallback(() => {
        setCurrentSearchMode("");
        ParkDataService.getAll(currentPage)
            .then(response => {
                setParks(response.data.parks);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const find = useCallback((query, by) => {
        ParkDataService.find(query, by, currentPage)
            .then(response => {
                setParks(response.data.parks);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const findByName = useCallback(() => {
        setCurrentSearchMode("findByName");
        find(searchName, "name");
    }, [find, searchName]);

    const findByState = useCallback(() => {
        setCurrentSearchMode("findByState");
        if(searchState === "All States") {
            retrieveParks();
        } else {
            find(searchState, "state");
        }
    }, [find, searchState, retrieveParks]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === "findByName") {
            findByName();
        } else if (currentSearchMode === "findByState") {
            findByState();
        } else {
            retrieveParks();
        }
    }, [currentSearchMode, findByName, findByState, retrieveParks]);


    useEffect(() => {
        retrieveStates();
    }, [retrieveStates]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    
    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const onChangeSearchState = e => {
        const searchState = e.target.value;
        setSearchState(searchState);
    }

    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchName}
                                    onChange={onChangeSearchName}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeSearchState}
                                >
                                    { states.map((state, i) => {
                                        return (
                                            <option value={state}
                                            key = {i}>
                                                {state}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByState}
                            >
                                    Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="parkRow">
                    {parks.map((park) => {
                        return(
                            <Col key={park._id}>
                                <Card className="parkListCard">
                                    <Card.Img
                                    className="parkView"
                                    src={park.image+"/100px180"}
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
                                        <Link className="parkLink" to={"/parks"+park._id}>
                                            View Park
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br />
                Showing Page: { currentPage + 1}
                <Button
                variant="link"
                onClick={() => { setCurrentPage(currentPage + 1)}}
                >
                    Get next { entriesPerPage } parks
                </Button>
            </Container>
        </div>
    )
}

export default ParksList;