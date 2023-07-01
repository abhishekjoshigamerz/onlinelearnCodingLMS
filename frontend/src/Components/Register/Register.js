import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { useRegisterUserMutation } from '../../features/users/usersSlice';
import { toast } from 'react-toastify'; 
import { NavLink } from 'react-router-dom';
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errors, setErrors] = useState({});

    const [postSubmissionMessage, setPostSubmissionMessage] = useState(null); // This is the message that will be displayed after the form is submitted
    const  [registerUser, { isLoading }] = useRegisterUserMutation(); // This is the mutation hook generated from the usersApiSlice 
    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;
        if(!email) {
            formIsValid = false;
            tempErrors["email"] = "Please enter your email.";
        }
        if(!password) {
            formIsValid = false;
            tempErrors["password"] = "Please enter your password.";
        }
        if(!fullName) {
            formIsValid = false;
            tempErrors["fullName"] = "Please enter your full name.";
        }
        setErrors(tempErrors);
        return formIsValid;
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(validateForm()) {
            console.log("Form is valid, proceed with registration...");

            // Do your registration process here
            try {
              console.log(email, password, fullName );
               const data =  await registerUser({email, password, fullName}).unwrap()
              console.log(data);
              if(data.status==200){
                
                toast.success('Registration successful! Please check your email for confirmation.');
              }

            } catch (error) {

              if(error.status==400){
                
                 toast.error('Email already exists');
              }else if(error.status==500){
                toast.error('Server error'); 
              }  
              //  setPostSubmissionMessage(error.message || 'Registration failed');
            }
         
         
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center min-vh-100">

                <Col md={6} lg={4}>
                    <Card className="shadow p-4">

                        <Card.Body>
                          
                          {postSubmissionMessage ?
                           <Alert variant="danger">
                                            {postSubmissionMessage}
                            </Alert>
                          : ''
                          }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    {errors["email"] &&
                                        <Alert variant="danger">
                                            {errors["email"]}
                                        </Alert>
                                    }
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    {errors["password"] &&
                                        <Alert variant="danger">
                                            {errors["password"]}
                                        </Alert>
                                    }
                                </Form.Group>

                                <Form.Group controlId="formBasicFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                    />
                                    {errors["fullName"] &&
                                        <Alert variant="danger">
                                            {errors["fullName"]}
                                        </Alert>
                                    }
                                </Form.Group>

                                <Button variant="primary mt-5" type="submit">
                                    Register
                                </Button> &nbsp;
                                <NavLink to="/login" className="btn btn-primary mt-5">Login</NavLink>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
