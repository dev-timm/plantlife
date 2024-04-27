import { Link } from "react-router-dom";
import NoResults from "../assets/no-results.svg";

import styles from '../styles/NotFound.module.css';
import formStyles from "../styles/Form.module.css";
import btnStyles from "../styles/Button.module.css";

import { Image, Col, Row, Container } from "react-bootstrap";

export const NotFound = () => {
    return (
        <Row className={formStyles.Row}>
            <Col className="my-auto">
                <Container className="col-xs-1 text-center">
                    <Image className="mb-4" src={NoResults} />
                    <h5 className={`${styles.Title} mb-4`}>Hey there, looks like the page doesn't exist!</h5>
                    <Link className={`${btnStyles.Button} ${btnStyles.Primary}`} to="/"> Let's go home</Link>
                </Container>

            </Col>
        </Row>
    )
}