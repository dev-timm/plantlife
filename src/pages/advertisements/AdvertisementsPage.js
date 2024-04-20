import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Image from 'react-bootstrap/Image'

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import { useCurrentUser } from "../../contexts/CurrentUserContext";

import NoResults from "../../assets/no-results.svg";
import SearchIcon from "../../assets/icon-search.svg"
import Asset from "../../components/Asset";
import { Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import Advertisement from "./Advertisement";

function AdvertisementsPage({ message, filter = "" }) {
    const [advertisements, setAdvertisements] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const currentUser = useCurrentUser();

    const [ordering, setOrdering] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const { data } = await axiosReq.get(`/advertisements/?${filter}ordering=${ordering}&search=${query}`);
                setAdvertisements(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchAdvertisements();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, ordering, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Row className="mt-4"><PopularProfiles mobile /></Row>
                <Row>
                    <Col>
                        <Image className={styles.SearchIcon} src={SearchIcon} />
                        <Form
                            className={styles.SearchBar}
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Control
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                type="text"
                                className="mr-sm-2"
                                placeholder="Search for ads and users"
                            />
                        </Form>
                    </Col>
                    <Col>
                        <Form className={styles.OrderDropdown}>
                            <Form.Control
                                as="select"
                                onChange={(event) => setOrdering(event.target.value)}
                                className="mr-sm-2">
                                <option value="">By date</option>
                                <option value="-price">By Price: High to Low</option>
                                <option value="price">By Price: Low to High</option>
                            </Form.Control>
                        </Form>
                    </Col>
                </Row>
                {hasLoaded ? (
                    <>
                        {advertisements.results.length ? (
                            <InfiniteScroll
                                children={advertisements.results.map((advertisement) => (
                                    <Advertisement key={advertisement.id} {...advertisement} setPosts={setAdvertisements} />
                                ))}
                                dataLength={advertisements.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!advertisements.next}
                                next={() => fetchMoreData(advertisements, setAdvertisements)}
                            />
                        ) : (
                            <Container className={appStyles.Card}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Card}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block mt-4 p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default AdvertisementsPage;