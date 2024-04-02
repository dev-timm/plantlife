import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

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
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.svg";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();
    const {setProfileData, handleFollow} = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/posts/?owner__profile=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="align-items-center">
                <Col lg={2}>
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.profile_image} />
                </Col>
                <Col lg={8}>
                    <p className={styles.ProfileOwner}>{profile?.owner}</p>
                </Col>
                <Col lg={2} className="text-lg-right">
                    {currentUser && !is_owner &&
                        (profile?.following_id ? (
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonUnFollow}`} onClick={() => { }}>Unfollow</Button>

                        ) : (
                            <Button className={`${btnStyles.Button} ${btnStyles.ButtonFollow}`} onClick={() => handleFollow(profile)}>Follow</Button>
                        ))}
                </Col>
            </Row>
            <Row>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
            <Row className="mt-5">
                <Col lg={6}>
                    <Row className="justify-content-center">
                        <Col xs={3} className="StatCol">
                            <div className={styles.Stats}>{profile?.posts_count}</div>
                            <div className={styles.StatsLabel}>Posts</div>
                        </Col>
                        <Col xs={3}>
                            <div className={styles.Stats}>{profile?.followers_count}</div>
                            <div className={styles.StatsLabel}>Followers</div>
                        </Col>
                        <Col xs={3}>
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
            <h5 className="ProfilePosts mb-4">{profile?.owner}'s posts</h5>
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
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );
    return (
        <Row>
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
                            {mainProfilePosts}
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