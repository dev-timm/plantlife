import React from "react";

import Button from "react-bootstrap/Button";

import styles from '../../styles/Profile.module.css'
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = (props) => {
    const { profile, mobile, imageSize = 32 } = props;
    const { id, following_id, profile_image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={profile_image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`} >
                <p className={styles.OwnerName}>{owner}</p>
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`} >
                {!mobile && currentUser && !is_owner &&
                    (following_id ? (
                        <Button className={`${btnStyles.Button} ${btnStyles.ButtonUnFollow}`} onClick={() => { }}>Unfollow</Button>
                    ) : (
                        <Button className={`${btnStyles.Button} ${btnStyles.ButtonFollow}`} onClick={() => { }}>Follow</Button>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile