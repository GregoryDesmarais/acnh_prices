import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import API from "../API"
import "./index.css"

class Main extends Component {

    state = {
        type: "All",
        data: [],
        filter: [],
        times: [],
        locations: [],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        search: "",
        month: "",
        time: "",
        location: ""
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {

        API.getAll()
            .then(res => {
                this.setState({
                    data: res.data
                }, () => this.runFilter())
            })
    }

    searchChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        }, () => {
            // this.getData();
            this.runFilter()
        });
    }

    getFilters = (data) => {
        let time = new Set();
        let location = new Set();
        data.forEach(item => {
            time.add(item.time)
            location.add(item.location)
        })
        this.setState({
            times: Array.from(time),
            locations: Array.from(location)
        })

    }

    runFilter = () => {
        let newFilter = [];
        switch (this.state.type) {
            case "Fish":
                newFilter = this.state.data.fish;
                this.getFilters(newFilter)
                break;
            case "Bugs":
                newFilter = this.state.data.bugs
                this.getFilters(newFilter)
                break;
            default:
                newFilter = this.state.data.fish.concat(this.state.data.bugs);
                this.getFilters(newFilter)
                break;
        }
        newFilter = newFilter.filter(item => item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
        if (this.state.month !== "") {
            newFilter = newFilter.filter(item => item.months.includes(this.state.month))
        }
        if (this.state.time !== "") {
            newFilter = newFilter.filter(item => item.time.includes(this.state.time))
        }
        if (this.state.location !== "") {
            newFilter = newFilter.filter(item => item.location.includes(this.state.location))
        }
        this.setState({
            filter: newFilter
        })
    }

    clearSearch = () => {
        this.setState({
            search: "",
            month: "",
            time: "",
            location: "",
            type: "All"
        }, () => this.runFilter())
    }



    render() {

        let curDate = new Date();
        let curMonth = curDate.toLocaleString('default', { month: "short" })

        return (
            <Container>
                <Row>
                    <Col lg={6}>
                        <Row className="text-center">
                            <Col>
                                <Form.Group controlId='type'>
                                    <Form.Label>Filter by Type</Form.Label>
                                    <FormControl as="select" onChange={this.searchChange} value={this.state.type} name='acnhsearch'>
                                        <option value="All">All</option>
                                        <option value="Fish">Fish</option>
                                        <option value="Bugs">Bugs</option>
                                    </FormControl>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col>
                                <Form.Group controlId='search'>
                                    <Form.Label>Filter by Name</Form.Label>
                                    <FormControl onChange={this.searchChange} value={this.state.search} name='acnhsearch' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='month'>
                                    <Form.Label>Filter by Month</Form.Label>
                                    <FormControl as="select" onChange={this.searchChange} value={this.state.month} name='acnhsearch'>
                                        <option value="">Select</option>
                                        {this.state.months.map((month, i) => {
                                            return (
                                                <option key={i} value={month}>{month}</option>
                                            )
                                        })}
                                    </FormControl>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col >
                                <Form.Group controlId='time'>
                                    <Form.Label>Filter by Time</Form.Label>
                                    <FormControl as="select" onChange={this.searchChange} value={this.state.time} name='acnhsearch'>
                                        <option value="">Select</option>
                                        {this.state.times.map((time, i) => {
                                            return (
                                                <option key={i} value={time}>{time}</option>
                                            )
                                        })}
                                    </FormControl>
                                </Form.Group>
                            </Col>
                            <Col className='text-center'>
                                <Form.Group controlId='location'>
                                    <Form.Label>Filter by Location</Form.Label>
                                    <FormControl as="select" onChange={this.searchChange} value={this.state.location} name='acnhsearch'>
                                        <option value="">Select</option>
                                        {this.state.locations.map((locations, i) => {
                                            return (
                                                <option key={i} value={locations}>{locations}</option>
                                            )
                                        })}
                                    </FormControl>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col >
                                <Button onClick={this.clearSearch}>Clear Filters</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} className="results">
                        {
                            this.state.filter.map((item, i) => {
                                return (
                                    <Card key={i}>
                                        <Card.Header><h4>{item.name}</h4></Card.Header>
                                        <Card.Body>
                                            <p>Price: {item.price}</p>
                                            <p>Location: {item.location}</p>
                                            <p>Time: {item.time}</p>
                                            <p>Available:</p>
                                            <Container>
                                                <Row className="months">
                                                    {
                                                        item.months.map((month, j) => {
                                                            if (curMonth === month)
                                                                return (<Col key={j} xs={3} className="curMonth">{month}</Col>)
                                                            else
                                                                return (<Col key={j} xs={3}>{month}</Col>)
                                                        })
                                                    }
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </Col>
                </Row >
            </Container >
        )
    }
}
export default Main;