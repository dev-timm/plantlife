import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    })
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user)
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data)
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto">
                <Container className={appStyles.Card}>
                    <h1 className={styles.Title}>Sign In</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label className={styles.Label}>username</Form.Label>
                            <Form.Control className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}

                        <Form.Group controlId="password">
                            <Form.Label className={styles.Label}>Password</Form.Label>
                            <Form.Control className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {errors.password?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}

                        <Button className={`${btnStyles.Button} ${btnStyles.Primary} ${btnStyles.Wide}`} type="submit">
                            Sign In
                        </Button>

                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
                        ))}

                        <Container>
                            <Link className={styles.Link} to="/signin">
                                Don't have an account yet? <span>Sign Up here</span>
                            </Link>
                        </Container>
                    </Form>

                </Container>

            </Col>
        </Row>
    );
};

export default SignInForm;