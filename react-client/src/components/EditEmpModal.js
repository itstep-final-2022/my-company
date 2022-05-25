import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';


export class EditEmpModal extends Component {

    photoFileName = "default.png";
    imageSrc = process.env.REACT_APP_PHOTOPATH + this.photoFileName;
    
    constructor(props) {
        super(props);
        this.state = {
            deps: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'department/')
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    deps: data 
                });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: event.target.EmployeeId.value,
                EmployeeName: event.target.EmployeeName.value,
                Department: event.target.Department.value,
                DateOfJoining: event.target.DateOfJoining.value,
                PhotoFileName: this.photoFileName
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

    handleFileSelected(event) {
        event.preventDefault();
        this.photoFileName = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            'myFile',
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'employee/save_file', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((result) => {
                this.imageSrc = process.env.REACT_APP_PHOTOPATH + result;
            })
            .catch ((error) => {
                alert('Operation Failed -> ' + error);
            })
    }

    render() {
        return (
            <div className='container'>
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='EmployeeId'>
                                        <Form.Label>EmployeeId</Form.Label>
                                        <Form.Control type="text" name="EmployeeId" placeholder="Employee ID" required
                                            disabled defaultValue={this.props.empId}/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId='EmployeeName'>
                                        <Form.Label>EmployeeName</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" placeholder="Employee Name" required
                                            defaultValue={this.props.empName}/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId='Department'>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.dep}>
                                            {
                                                this.state.deps.map(dep => (
                                                    <option key={dep.DepartmentId}>{dep.DepartmentName}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId='DateOfJoining'>
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control type="date" name="DateOfJoining" placeholder="Date Of Joining" required
                                            defaultValue={this.props.dateOfJoining}/>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Employee
                                        </Button>
                                    </Form.Group>
                                </Form>  
                                <br/>
                            </Col>
                            <Col sm={6}>
                                <Image width="300" height="300" src={process.env.REACT_APP_PHOTOPATH + this.props.photoFileName} />
                                <br/><br/>
                                <input type="file" onChange={this.handleFileSelected} />
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
