import React, { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";

import ReportCreateForm from "./ReportCreateForm";

import { ReactComponent as LikeIcon } from '../../assets/icon-like.svg';
import { ReactComponent as CommentIcon } from '../../assets/icon-comment.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/icon-bookmark.svg';
import { ReactComponent as ReportIcon } from '../../assets/icon-report.svg';
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Modal from 'react-bootstrap/Modal';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        post_image,
        updated_on,
        postPage,
        setPosts,
        bookmark_id,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [reportModalShow, setReportModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [isPostReported, setIsPostReported] = useState(false);

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            // console.log(err);
        }
    };

    const handleBookmark = async () => {
        try {
            const { data } = await axiosRes.post("/bookmarks/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, bookmark_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            // console.log(err)
        }
    };

    const handleUnbookmark = async () => {
        try {
            await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, bookmark_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            // console.log(err)
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {

        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    useEffect(() => {
        const checkReports = async () => {
            try {
                const { data } = await axiosReq.get("/reports/");
                const checkReportPresence = data.filter(report => report.post === id && report.owner === currentUser?.username);
                if (checkReportPresence.length) {
                    setIsPostReported(true);
                }
            } catch (err) {
                // console.log(err)
            }
        };
        checkReports();
    }, [currentUser?.username, id]);

    const showReportIcon = () => {
        if (is_owner) {
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't report your own post!</Tooltip>}>
                    <ReportIcon fill='green' />
                </OverlayTrigger>
            )
        } else if (currentUser && !is_owner) {
            if (isPostReported === true) {
                return (
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>You've already reported this post!</Tooltip>}>
                        <ReportIcon fill='green' />
                    </OverlayTrigger>
                )
            } else {
                return (<ReportIcon fill='#152E21' onClick={() => setReportModalShow(true)} />)
            }
        } else {
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to report posts!</Tooltip>}>
                    <ReportIcon fill='#152E21' />
                </OverlayTrigger>
            );
        }
    };

    function ReportModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Report Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-2">
                    <h5>Report "{title}"</h5>
                    <p>
                        Are you sure you want to report this post? This action can't be undone!
                    </p>
                    <ReportCreateForm
                        owner={owner}
                        post={id}
                        setReportModalShow={setReportModalShow}
                        setIsPostReported={setIsPostReported}
                    />
                </Modal.Body>
            </Modal>
        );
    }

    function DeleteModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-2">
                    <h5>Delete "{title}"</h5>
                    <p>
                        Are you sure you want to delete this post? This action can't be undone!
                    </p>
                    <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2`} onClick={handleDelete} >
                        Delete
                    </Button>
                    <Button className={`${btnStyles.Button} ${btnStyles.Secondary} float-right ml-2`} onClick={() => setDeleteModalShow(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
        );
    }


    return (
        <Card className={styles.Post}>
            <Card.Body className="px-0">
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} className="d-flex align-items-center">
                        <Avatar src={profile_image} height={48} />
                        <div className="ml-2">
                            {owner} <br />
                            <span className={styles.Updated}> {updated_on}</span>
                        </div>
                    </Link>
                    <div className="d-flex align-items-center">
                        {showReportIcon()}
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDeleteModal={() => setDeleteModalShow(true)}
                            />
                        )}
                    </div>
                    <DeleteModal
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}
                    />
                    <ReportModal
                        show={reportModalShow}
                        onHide={() => setReportModalShow(false)}
                    />
                </Media>
            </Card.Body>
            <Card.Body className="px-0">
                {title && <Card.Title>{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
            <Card.Body className="px-0">
                <Link to={`/posts/${id}`}>
                    <Card.Img className={appStyles.Image} src={post_image} alt={title} />
                </Link>
            </Card.Body>
            <Card.Body className="px-0">
                <div>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                            <LikeIcon fill='#152E21' />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <LikeIcon fill='green' stroke='green' />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <LikeIcon fill='#152E21' />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}>
                            <LikeIcon fill='#152E21' />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link className="ml-2" to={`/posts/${id}`} aria-label="Comment">
                        <CommentIcon fill='#152E21' />
                    </Link>
                    {comments_count}
                    <div className=" d-inline float-right">
                        {bookmark_id ? (
                            <span onClick={handleUnbookmark}>
                                <BookmarkIcon fill='green' stroke='green' />
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleBookmark}>
                                <BookmarkIcon fill='#152E21' />
                            </span>
                        ) : (
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Log in to bookmark posts!</Tooltip>}>
                                <BookmarkIcon fill='#152E21' />
                            </OverlayTrigger>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;