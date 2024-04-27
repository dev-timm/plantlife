import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";


const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_on, content, id, setPost, setComments } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) {
            console.log(err)
        }
    };

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
                        Delete Advertisement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-2">
                    <h5>Delete "{content}"</h5>
                    <p>
                        Are you sure you want to delete this advertisement? This action can't be undone!
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
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_on}</span>
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <MoreDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDeleteModal={() => setDeleteModalShow(true)}
                    />
                )}
                <DeleteModal
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                />
            </Media>
        </>
    );
}

export default Comment;