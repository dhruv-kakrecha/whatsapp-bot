/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Radio, Row, Space } from "antd";
// import Text from "./Text";
// import { MediaUpload } from "../../../../MediaUpload";
import Buttons from "./Buttons";
import UploadMedia from "./UploadMedia";
import axios from "axios";

const RichCard = ({
}) => {

    const [buttons, setButtons] = useState([
        {
            id: 0,
            type: 0,
            title: "",
            payload: "",
        }
    ])

    // useEffect(() => {
    //     const { data } = axios.post("https://wa-wati-backend.vercel.app/templates/create")
    // }, [])

    const [url, setUrl] = useState("")
    const [form] = Form.useForm();



    const handleCreateTemplate = () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTVkZWQ3Mi03NTY2LTQzYjQtOTJkNi1mNzY4YTJlYjI5M2QiLCJ1bmlxdWVfbmFtZSI6IkRyZGlhbW9uZGF1dG9AZ21haWwuY29tIiwibmFtZWlkIjoiRHJkaWFtb25kYXV0b0BnbWFpbC5jb20iLCJlbWFpbCI6IkRyZGlhbW9uZGF1dG9AZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDEvMzAvMjAyNSAwODo1Nzo0MSIsInRlbmFudF9pZCI6IjM2Njk4MyIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.JXaVPPsDpgz8AJQvcmrwSRSMeaiZ_Z5mSd8BCVgGdtU"
        const payload = {
            "id": "",
            "type": "template",
            "category": "MARKETING",
            "subCategory": "STANDARD",
            "buttonsType": "quick_reply_and_call_to_action",
            "buttons": [
                {
                    "type": "url",
                    "parameter": {
                        "text": "Visit us",
                        "phoneNumber": "",
                        "url": "https://www.wati.io",
                        "urlType": "static"
                    }
                },
                {
                    "type": "call",
                    "parameter": {
                        "text": "Call now",
                        "urlType": "none",
                        "phoneNumber": "919999999999"
                    }
                },
                {
                    "type": "quick_reply",
                    "parameter": {
                        "text": "Interested",
                        "urlType": "none"
                    }
                }
            ],
            "footer": "Footer",
            "header": {
                "type": "image",
                "link": "https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "mediaFromPC": "",
                "mediaHeaderId": ""
            },
            "customParams": [],
            "elementName": "Test temp1",
            "body": "Body text",
            "language": "en",
            "client_id": "366983"
        }

        axios.post("https://wa-wati-backend.vercel.app/templates/create", payload , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    const handleUpload = ({ file }) => {
        const fileUrl = URL.createObjectURL(file);
        setUrl(fileUrl)
    }

    const handleAddButton = () => {
        if (buttons?.length === 3) {
            message.warning("Cannot add more than 3 buttons");
        } else {
            setButtons((prev) => [
                ...prev,
                {
                    id: prev?.length,
                    type: 0,
                    title: "",
                    payload: "",
                },
            ]);
        }
    };


    const handleButtonFieldsChange = (index, fieldName, newValue) => {
        const updatedButtons = [...buttons];
        updatedButtons[index] = { ...updatedButtons[index], [fieldName]: newValue };
        setButtons(updatedButtons);

        // if (fieldName === "type") {
        //     if (newValue === 0) {
        //         // Update button type to normal (0)
        //         updatedButtons[index] = { ...updatedButtons[index], type: newValue };
        //         setButtons(updatedButtons);
        //     } else if (newValue === 1 || newValue === 2) {
        //         const callButtons = buttons.filter(button => button.type === 1);
        //         const urlButtons = buttons.filter(button => button.type === 2);

        //         if (newValue === 1 && callButtons.length >= 2) {
        //             message.warning("Cannot add more than two Call to Action buttons.");
        //             return;
        //         }

        //         if (newValue === 2 && urlButtons.length >= 2) {
        //             message.warning("Cannot add more than two URL buttons.");
        //             return;
        //         }

        //         // If within limits, update button type
        //         updatedButtons[index] = { ...updatedButtons[index], type: newValue };
        //         setButtons(updatedButtons);
        //     }
        // } else {

        // }
    };


    const handleDeleteButton = (index) => {
        if (buttons.length === 1) return;
        const updatedButtons = buttons?.filter((_, i) => i !== index);
        setButtons(updatedButtons);
    };

    return (
        <div>
            <Form form={form} layout="vertical">
                <Col>

                    {/* Media upload */}

                    <Row gutter={[16, 24]}>
                        <Col md={12}>
                            <UploadMedia url={url} handleUpload={handleUpload} />
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                style={{ marginBottom: "15px" }}
                                name={"title"}
                                label={"Title"}
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: "Please enter title",
                                    },
                                    { max: 25, message: "Title must be within 25 characters" },
                                ]}
                            >
                                <Input
                                    // onChange={(e) => handleFieldsChange(e.target.value, "title")}
                                    //   value={title}
                                    //   defaultValue={title}

                                    placeholder="Title"
                                    maxLength={200}
                                    showCount
                                />
                            </Form.Item>
                            <Form.Item
                                name={"description"}
                                label={"Deacription"}
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: "Please enter description",
                                    },
                                    { max: 999, message: "Description must be within 999 characters" },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    // onChange={(e) => handleFieldsChange(e.target.value, "title")}
                                    //   value={title}
                                    //   defaultValue={title}
                                    placeholder="Description"
                                    maxLength={999}
                                    showCount
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Col>

                <Buttons
                    handleAddButton={handleAddButton}
                    buttons={buttons}
                    handleButtonFieldsChange={handleButtonFieldsChange}
                    handleDeleteButton={handleDeleteButton}
                    form={form}
                    maxLength={3}
                />

                <Button
                    type="primary"
                    style={{
                        padding: "10px 30px",
                        marginTop: 25,
                    }}
                    onClick={handleCreateTemplate}
                >
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default RichCard;