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
        type: "Fish",
        data: [],
        filter: [],
        search: "",
        month: "",
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
            this.getData();
            this.runFilter()
        });
    }

    runFilter = () => {
        let newFilter = this.state.data.filter(item => item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1)
        if (this.state.month !== "") {
            newFilter = newFilter.filter(item => item.months.includes(this.state.month))
        }
        this.setState({
            filter: newFilter
        })
    }

    clearSearch = () => {
        this.setState({
            search: "",
            month: ""
        }, () => this.runFilter())
    }



    render() {

        let curDate = new Date();
        let curMonth = curDate.toLocaleString('default', { month: "short" })

        return (
            <Container>
                <Row>
                    <Col lg={6}>
                        <Row>
                            {/* <Col>
                                <Form.Group controlId='type'>
                                    <Form.Label>Search by Type</Form.Label>
                                    <FormControl as="select" onChange={this.searchChange} value={this.state.type} name='acnhsearch'>
                                        <option value="Fish">Fish</option>
                                        <option value="Bugs">Bugs</option>
                                    </FormControl>
                                </Form.Group>
                            </Col> */}
                            <Col>
                                <Form.Group controlId='search'>
                                    <Form.Label>Search by Name</Form.Label>
                                    <FormControl onChange={this.searchChange} value={this.state.search} name='acnhsearch' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='month'>
                                    <Form.Label>Search by Month</Form.Label>
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
                        <Row>
                            <Col className='text-center'>
                                <Button onClick={this.clearSearch}>Clear Search</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} className="results">
                        {/* <h4>{`Results: ${this.state.filter.length}`}</h4> */}
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