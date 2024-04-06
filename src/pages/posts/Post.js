import React from "react";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import { ReactComponent as LikeIcon } from '../../assets/icon-like.svg';
import { ReactComponent as CommentIcon } from '../../assets/icon-comment.svg';
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
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
    }

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`)
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {

        }
    }

    return (
        <Card className={styles.Post}>
            <Card.Body className="px-0">
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={48} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_on}</span>
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
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
                            <LikeIcon fill='#152E21'/>
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link className="ml-2" to={`/posts/${id}`}>
                        <CommentIcon fill='#152E21' />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;