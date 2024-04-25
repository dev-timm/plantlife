import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css"

import { axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function ReportCreateForm(props) {
    const { owner, post, setReportModalShow, setIsPostReported } = props;
    const [reportReason, setReportReason] = useState("");

    useRedirect('loggedOut');
    const [errors, setErrors] = useState({});

    const handleFormValueChange = (event) => {
        setReportReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/reports/", {
                owner,
                post,
                "report_reason": reportReason,
            });
            setIsPostReported(true)
            setReportModalShow(false)
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const dropdownField = (
        <div>
            <div className={formStyles.Dropdown}>
                <Form.Control
                    as="select"
                    className="mr-sm-2 mb-3"
                    defaultValue="default"
                    onChange={handleFormValueChange}>
                    <option value="default" disabled>What is wrong with this post?</option>
                    <option value="offensive_content">Offensive Content</option>
                    <option value="foul_language">Foul Language</option>
                    <option value="other">Other</option>
                </Form.Control>

                {errors?.report_reason?.map(idx => (
                    <Alert variant="warning" key={idx}>Please select a reason for reporting this post.</Alert>
                ))}

                <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2 mt-3`} type="submit">
                    Report
                </Button>
                <Button className={`${btnStyles.Button} ${btnStyles.Secondary} float-right ml-2 mt-3`} onClick={() => setReportModalShow(false)}>Cancel</Button>
            </div>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <div>{dropdownField}</div>
        </Form>
    );
}

export default ReportCreateForm;