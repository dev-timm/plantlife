import NoResults from "../assets/no-results.svg";
import styles from '../styles/NotFound.module.css';
import { Image, Col, Row, Container } from "react-bootstrap";


export const NoFindings = () => {
    return (
        <Row>
            <Col>
                <Container className="col-xs-1 text-center">
                    <Image className="mb-4" src={NoResults} />
                    <h6 className={`${styles.Title} mb-4`}>No results found.</h6>
                </Container>
            </Col>
        </Row>
    );
};