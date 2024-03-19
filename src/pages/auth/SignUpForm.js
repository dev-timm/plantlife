import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Row className={styles.Row}>
            <Col className="my-auto">
                <Container className={appStyles.Card}>
                    <h1 className={styles.Title}>Sign Up</h1>

                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label className={styles.Label}>username</Form.Label>
                            <Form.Control className={styles.Input} type="text" placeholder="Username" name="username" />
                        </Form.Group>

                        <Form.Group controlId="password1">
                            <Form.Label className={styles.Label}>Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Password" name="password" />
                        </Form.Group>

                        <Form.Group controlId="password2">
                            <Form.Label className={styles.Label}>Confrm Password</Form.Label>
                            <Form.Control className={styles.Input} type="password" placeholder="Confirm password" name="password2" />
                        </Form.Group>

                        <Button className={`${btnStyles.Button} ${btnStyles.Primary} ${btnStyles.Wide}`} type="submit">
                            Sign Up
                        </Button>
                        <Container>
                            <Link className={styles.Link} to="/signin">
                                Already a User? <span>Sign In here</span>
                            </Link>
                        </Container>
                    </Form>

                </Container>

            </Col>
        </Row>
    );
};

export default SignUpForm;