import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { PopularProfile } from "./Profile";


const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData();

    return (
        <Container className={`${appStyles.Card} ${mobile && 'd-lg-none text-center mb-3'}`}>
            {popularProfiles.results.length ? (
                <>
                    <h6>People you may want to follow:</h6>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results.slice(0, 4).map(profile => (
                                <PopularProfile key={profile.id} profile={profile} mobile />
                            ))}
                        </div>
                    ) : (
                        popularProfiles.results.slice(0, 6).map(profile => (
                            <PopularProfile key={profile.id} profile={profile} />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    )
}

export default PopularProfiles