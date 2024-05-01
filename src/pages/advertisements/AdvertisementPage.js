import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Advertisement from "./Advertisement";
import PopularProfiles from "../profiles/PopularProfiles";
function AdvertisementPage() {
    const { id } = useParams();
    const [advertisement, setAdvertisement] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: advertisement }] = await Promise.all([
                    axiosReq.get(`/advertisements/${id}`),
                ]);
                setAdvertisement({ results: [advertisement] });
            } catch (err) {
                // console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100 mt-4">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Advertisement {...advertisement.results[0]} setPosts={setAdvertisement} AdvertisementPage />
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default AdvertisementPage;