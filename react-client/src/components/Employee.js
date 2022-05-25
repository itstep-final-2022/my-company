import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            addModalShow: false,
            editModalShow: false
        };
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'employee/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    emps: data
                });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empId) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'employee/' + empId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
    }
    
    render() {
        const { emps, empId, empName, dep, photoFileName, dateOfJoining } = this.state;
        const addModalClose = () => this.setState({ addModalShow: false });
        const editModalClose = () => this.setState({ editModalShow: false });
        
        return (
            <div className="mt-5">
                <Table className="mt-4 text-center" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>DateOfJoininig</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emps.map(emp => (
                                <tr key={emp.EmployeeId}>
                                    <td>{emp.EmployeeId}</td>
                                    <td>{emp.EmployeeName}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.DateOfJoining}</td>
                                    <td>
                                        <ButtonToolbar style={{width: '205px', margin: '0 auto'}}>
                                            <Button 
                                                className="mr-2" 
                                                variant="success" 
                                                style={{width: '100px'}}
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    empId: emp.EmployeeId,
                                                    empName: emp.EmployeeName,
                                                    dep: emp.Department,
                                                    photoFileName: emp.photoFileName,
                                                    dateOfJoining: emp.dateOfJoining
                                                })}                                            
                                            >
                                                Edit
                                            </Button>&nbsp;
                                            
                                            <Button 
                                                className="mr-2" 
                                                variant="danger" 
                                                style={{'width': '100px'}}
                                                onClick={() => this.deleteEmp(emp.EmployeeId)}                                          
                                            >
                                                Delete
                                            </Button>

                                            <EditEmpModal
                                                show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                empId={empId}
                                                empName={empName}
                                                dep={dep}
                                                photoFileName={photoFileName}
                                                dateOfJoining={dateOfJoining}
                                            />
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>   
                <br/>             
                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ addModalShow: true })}
                    >
                        Add Employee
                    </Button>
                    <AddEmpModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        );
    }

}
