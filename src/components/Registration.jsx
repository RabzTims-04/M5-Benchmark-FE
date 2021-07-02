 import {Component} from 'react'
 import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap'
 import Alerting from './Alerting'
 import '../css/Registration.css'

 class Registration extends Component{

    state={
        name:"",
        nameError:false,
        surname:'',
        surnameError:false,
        number: '',
        email:'',
        age:'',
        address:'',
        city:'',
        emailError:false,
        isError:false,
        pass:'',
        credit:'',
        visible:false
    }

     submitBtn = (e)=>{
         let num=[1,2,3,4,5,6,7,8,9,0]
         let passincludes = num.some(no => this.state.pass.includes(no))
        if((this.state.name.length>2 ) && ( this.state.surname.length>3) && (this.state.email.includes('@')) && (this.state.email.includes('.com')) && (this.state.number.toString().length===5) && ( this.state.pass.toString().length>7) && (passincludes)){
             setTimeout(()=>( this.setState({ 
                ...this.state,           
                visible:true
            })), 500)
        }
        else{
            setTimeout(() => (this.setState({
                ...this.state,
                visible:false
            })), 500)
        }         
    } 

    handleName =(e) =>{
        e.target.value.length>2?
        this.setState({
            ...this.state,
            name:e.target.value
        })
        :this.setState({
            ...this.state,
            name:e.target.value,
            nameError:true
        })
    }

    handleSurName =(e) =>{
        e.target.value.length>3?
        this.setState({
            ...this.state,
            surname:e.target.value
        })
        :this.setState({
            ...this.state,
            surname:e.target.value,
            surnameError:true
        })
    }

    handleEmail =(e)=>{
        ((e.target.value.includes('@')) && (e.target.value.includes('.')) && (e.target.value.includes('com')))
        ?this.setState({
            ...this.state,
            email:e.target.value
        })
        : this.setState({
            ...this.state,
            email:e.target.value,
            emailError:true
        })
    }

    handleChange = (e) =>{
        
        e.target.value.toString().length<6 ?
            this.setState({
                number:e.target.value
            })
            :this.setState({
                ...this.state,
                isError:true
            })
    }

    handlepasschange =(e)=>{
        this.setState({
            ...this.state,
            pass:e.target.value
        })
    }

    handleCredit =(e)=>{
        this.setState({
            ...this.state,
            credit:'X'
        })
    }

    alert =()=>{
        if(this.state.isError || this.state.nameError || this.state.surnameError || this.state.emailError){
            setTimeout(()=>(this.setState({
                ...this.state,
                isError:false,
                nameError:false,
                surnameError:false,
                emailError:false,
            })),3000)
        }
    }

    handleSubmit =(e) =>{
        e.preventDefault()
        this.props.name(this.state.name)
        this.props.surname(this.state.surname)
        this.props.email(this.state.email)
        this.props.age(this.state.age)
        this.props.address(this.state.address)
        this.props.city(this.state.city)
        this.props.postal(this.state.number)
        this.props.history.push('/register/complete')     
    }

    componentDidUpdate =()=>{
        this.alert()
        this.submitBtn()  
    }

    render(){
        
        return(
            <Container className="mt-5">
            <Row>
                <Col md={{span:6, offset:3}}>

                 <Form id="registration" onSubmit={(e) => this.handleSubmit(e)} >
                    <Form.Group controlId="formBasicEmail">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>                            
                                <InputGroup.Text>Name and Surname <span className="ml-2 text-danger">*</span></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Name" value={this.state.name} onChange={this.handleName} required minLength="2" />
                            {this.state.nameError && <Alerting class='name' color='danger' msg='Name length should be greater than 2' />}
                            <FormControl placeholder="Surname" value={this.state.surname} onChange={this.handleSurName} required minLength="3"/>
                            {this.state.surnameError && <Alerting class='surname' color='danger' msg='Surname length should be greater than 3' />}
                           
                        </InputGroup>
                        <div className="d-flex ">
                            <Form.Label>Email address</Form.Label>
                            <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                        </div>
                            {this.state.emailError && <Alerting class='email' color='danger' msg='Please follow the email pattern: eg: example@example.com' />}
                        <Form.Control value={this.state.email} onChange={this.handleEmail} required type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        example@example.com
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <div className="d-flex">
                        <Form.Label>Password</Form.Label>
                        <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                        </div>
                        <Form.Control
                        value={this.state.pass}
                        onChange={this.handlepasschange} 
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                        required minLength="8" 
                        type="password" 
                        placeholder="Password" />
                         <Form.Text className="text-muted">
                         Should contain at least 8 chars, 1 digit, 1 letter
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <div className="d-flex ">
                        <Form.Label>Year of Birth</Form.Label>
                        <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                        </div>
                        <Form.Control 
                        value={this.state.age} 
                        onChange={(e)=> this.setState({
                            ...this.state,
                            age:e.target.value
                        })} 
                        required 
                        min="1910-01-01" 
                        type="date" 
                        placeholder="Password" />
                       </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                       <div className="d-flex">
                       <Form.Label>Street Address</Form.Label>
                        <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                       </div>
                        <Form.Control
                        value={this.state.address}
                        onChange={(e)=> this.setState({
                            ...this.state,
                            address:e.target.value
                        })} 
                        as="textarea" 
                        rows={2} 
                        placeholder="Address" 
                        required />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <div className="d-flex">
                        <Form.Label>City</Form.Label>
                        <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                        </div>
                        <Form.Control 
                        value={this.state.city}
                        onChange={(e)=> this.setState({
                            ...this.state,
                            city:e.target.value
                        })}
                        type="text" 
                        placeholder="City" 
                        required />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <div className="d-flex">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Text className="text-danger ml-2">
                        *
                        </Form.Text>
                        </div>
                        <Form.Control
                        value={this.state.number}
                        onChange={(e) => this.handleChange(e)}
                        type='number' 
                        required 
                        placeholder="Postal Code"  
                        min='0' 
                        />
                    </Form.Group>
                    {this.state.isError && <Alerting class='postal' color='danger' msg='Max Length: 5!!!' />}

                    </div>

                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Credit-Card</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl required maxLength="4" value={this.state.credit} onChange={this.handleCredit} />
                            <FormControl required maxLength="4" value={this.state.credit} onChange={this.handleCredit}/>
                            <FormControl required maxLength="4" value={this.state.credit} onChange={this.handleCredit}/>
                            <FormControl required maxLength="4" value={this.state.credit} onChange={this.handleCredit}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Text className="text-danger ml-2">
                        * Fields are required
                        </Form.Text>

                    <Button variant="primary" type="submit" style={this.state.visible? {visibility:'visible'}: {visibility:'hidden'}}>
                        Submit
                    </Button>
                </Form>

                </Col>
            </Row>
        </Container>
    )
}
    
 }

 export default Registration