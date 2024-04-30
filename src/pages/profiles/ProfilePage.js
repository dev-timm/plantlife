import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/ProfileEditDropdown";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import Advertisement from "../advertisements/Advertisement";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.svg";
import { NoFindings } from "../../components/NoFindings";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const [profileAdvertisements, setProfileAdvertisements] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }, { data: profileAdvertisements }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                        axiosReq.get(`/advertisements/?owner__profile=${id}`),
                    ]);
                await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/posts/?owner__profile=${id}`),
                    axiosReq.get(`/advertisements/?owner__profile=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setProfileAdvertisements(profileAdvertisements);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="align-items-center mb-4">
                <Col md={2} xs={3}>
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.profile_image} />
                </Col>
                <Col md={5} xs={4}>
                    <p className={styles.ProfileOwner}>{profile?.owner}</p>
                </Col>
                <Col md={5} xs={5} className="text-right">
                    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
                    {currentUser && !is_owner &&
                        (profile?.following_id ? (
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonUnFollow}`} onClick={() => handleUnfollow(profile)}>Unfollow</Button>

                        ) : (
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonFollow}`} onClick={() => handleFollow(profile)}>Follow</Button>
                        ))}
                </Col>
            </Row>
            <Row>
                {profile?.bio && <Col className="p-3">{profile.bio}</Col>}
            </Row>
            <Row className="mt-5">
                <Col lg={6}>
                    <Row className="justify-content-center">
                        <Col xs={4} className="StatCol">
                            <div className={styles.Stats}>{profile?.posts_count}</div>
                            <div className={styles.StatsLabel}>Posts</div>
                        </Col>
                        <Col xs={4}>
                            <div className={styles.Stats}>{profile?.followers_count}</div>
                            <div className={styles.StatsLabel}>Followers</div>
                        </Col>
                        <Col xs={4}>
                            <div className={styles.Stats}>{profile?.following_count}</div>
                            <div className={styles.StatsLabel}>Following</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <NoFindings />
            )}
        </>
    );

    const mainProfileAdvertisements = (
        <>
            {profileAdvertisements.results.length ? (
                <InfiniteScroll
                    children={profileAdvertisements.results.map((advertisement) => (
                        <Advertisement key={advertisement.id} {...advertisement} setAdvertisements={setProfileAdvertisements} />
                    ))}
                    dataLength={profileAdvertisements.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileAdvertisements.next}
                    next={() => fetchMoreData(profileAdvertisements, setProfileAdvertisements)}
                />
            ) : (
                <NoFindings />
            )}
        </>
    );

    return (
        <Row className="mt-4">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Card}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
                <Container className={`${appStyles.Card} mt-4`}>
                    {hasLoaded ? (
                        <>
                            <Tabs className="mb-4" defaultActiveKey="posts" id="uncontrolled-tab-example">
                                <Tab eventKey="posts" title="Posts">
                                    {mainProfilePosts}
                                </Tab>
                                <Tab eventKey="advertisements" title="Advertisements">
                                    {mainProfileAdvertisements}
                                </Tab>
                            </Tabs>
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;