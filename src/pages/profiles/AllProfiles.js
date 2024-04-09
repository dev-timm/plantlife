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
import NoResults from "../../assets/no-results.svg";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const AllProfiles = ({ message, filter = "" }) => {
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
                console.log(err);
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
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                {hasLoaded ? (
                    <>
                        <Container className={`${appStyles.Card}`}>
                        <h1>Plant Lovers</h1>
                            {profiles.results.length ? (
                                <InfiniteScroll
                                    children={profiles.results.map(profile => (
                                        <Profile key={profile.id} imageSize={48} profile={profile} {...profile} setProfiles={setProfiles} />
                                    ))}
                                    dataLength={profiles.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!profiles.next}
                                    next={() => fetchMoreData(profiles, setProfiles)}
                                />
                            ) : (
                                <Container className={appStyles.Card}>
                                    <Asset src={NoResults} message={message} />
                                </Container>
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