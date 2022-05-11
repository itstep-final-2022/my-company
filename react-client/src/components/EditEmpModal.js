import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditEmpModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let depId = event.target.DepartmentId.value;
        fetch(process.env.REACT_APP_API + 'department/' + depId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentId: event.target.DepartmentId.value,
                DepartmentName: event.target.DepartmentName.value
            })
        })
        .then(response => response.json())
        .then((result) => {
            alert(result);
        })
        .catch((error) => {
            alert('Operation Failed -> ' + error);
        });
    }

    render() {
        return (
            <div className='container'>
                <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={9}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='DepartmentId'>
                                        <Form.Label>DepartmentId</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="DepartmentId" 
                                            placeholder="Department Id" 
                                            defaultValue={this.props.depid}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='DepartmentName'>
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="DepartmentName" 
                                            placeholder="Department Name" 
                                            defaultValue={this.props.depname}
                                            required
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Department
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
