import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";

import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { Profile } from "./Profile";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";

import Image from 'react-bootstrap/Image';
import styles from "../../styles/Form.module.css";
import SearchIcon from "../../assets/icon-search.svg";
import { Form } from "react-bootstrap";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { NoFindings } from "../../components/NoFindings";


const AllProfiles = ({ filter = "" }) => {
    const [profiles, setProfiles] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const currentUser = useCurrentUser();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/?${filter}search=${query}`);
                setProfiles(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchProfiles();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100 mt-4">
            <Col className="py-2" lg={8}>
                <Row>
                    <Col>
                        <PopularProfiles mobile />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image className={styles.SearchIcon} src={SearchIcon} alt="Search Icon" />
                        <Form
                            className={styles.SearchBar}
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Control
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                type="text"
                                className="mr-sm-2"
                                placeholder="Search for users"
                            />
                        </Form>
                    </Col>
                </Row>
                {hasLoaded ? (
                    <>
                        <Container className={`${appStyles.Card}`}>
                            {profiles.results.length ? (
                                <InfiniteScroll
                                    children={profiles.results.map(profile => (
                                        <Profile key={profile.id} profile={profile} {...profile} setProfiles={setProfiles} />
                                    ))}
                                    dataLength={profiles.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!profiles.next}
                                    next={() => fetchMoreData(profiles, setProfiles)}
                                />
                            ) : (
                                <NoFindings />
                            )}
                        </Container>
                    </>
                ) : (
                    <Asset spinner />
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    )
}

export default AllProfiles