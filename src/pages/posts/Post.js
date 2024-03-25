import React from "react";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import { ReactComponent as LikeIcon } from '../../assets/icon-like.svg';
import { ReactComponent as CommentIcon } from '../../assets/icon-comment.svg';

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

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
                        {is_owner && postPage && "..."}
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
                            <LikeIcon fill='#152E21' stroke='#152E21' />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={() => { }}>
                            <LikeIcon fill='green' stroke='green' />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => { }}>
                            <LikeIcon fill='#152E21' stroke='#152E21' />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}>
                            <LikeIcon fill='red' stroke='green' />
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