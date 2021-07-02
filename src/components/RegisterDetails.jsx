import { Component } from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class RegisterDetails extends Component {

    ageFunc =(dob) =>{
        let today = new Date()
        let birthdate = new Date(dob)
        let age = today.getFullYear() - birthdate.getFullYear()
        let month = today.getMonth() - birthdate.getMonth()
        if(month < 0 || (month === 0 && today.getDate() < birthdate.getDate())){
            age--
        }

        return age
    }

   
    render() {
        return (

            <Container>
                <Row className="">
                    <Col md={{span:6 , offset:4}}>

                        <h1 className=" mt-3 mb-5 text-danger">User Details</h1>

                        <Table striped bordered hover>
                            <tbody>

                                <tr>
                                <td className="text-danger font-weight-bold">Name:</td>
                                <td className="text-white">{this.props.name}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Surname:</td>
                                <td className="text-white">{this.props.surname}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Email:</td>
                                <td className="text-white">{this.props.email}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Age:</td>
                                <td className="text-white">{this.ageFunc(this.props.age)}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Address:</td>
                                <td className="text-white">{this.props.address}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">City:</td>
                                <td className="text-white">{this.props.city}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Postal-Code:</td>
                                <td className="text-white">{this.props.postal}</td>
                                </tr>

                            </tbody>
                        </Table>
         
                    </Col>
                </Row>

                <div className="text-center mt-5">
                    <Link to='/'>
                       <Button  variant="outline-secondary">Home</Button>
                    </Link>

                    </div>
            </Container>
        );
    }
}

export default RegisterDetails