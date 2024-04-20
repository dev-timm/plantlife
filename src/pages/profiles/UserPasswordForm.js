import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/UsernamePasswordEditForm.module.css";
import formStyles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={formStyles.Row}>
      <Col className="my-auto">
        <Container className={appStyles.Card}>
          <h1 className={styles.Title}>Change Password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className={formStyles.Label}>New Password</Form.Label>
              <Form.Control className={formStyles.Input}
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>

            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label className={formStyles.Label}>Confirm password</Form.Label>
              <Form.Control className={formStyles.Input}
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>

            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <div className="mb-5">
              <Button className={`${btnStyles.Button} ${btnStyles.Primary} ml-2 float-right`} type="submit">
                Update Password
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary} float-right`}
                onClick={() => history.goBack()}>
                Cancel
              </Button>
            </div>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;