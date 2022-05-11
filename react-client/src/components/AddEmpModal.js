import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class AddEmpModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'department/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentId: null,
                DepartmentName: event.target.DepartmentName.value
            })
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
        })
        .error(() => {
            alert('Operation Failed');
        });
    }

    render() {
        return (
            <div className='container'>
                <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={9}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='DepartmentName'>
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" placeholder="Department Name" required/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Department
                                        </Button>
                                    </Form.Group>
                                </Form>  
                                <br/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}
