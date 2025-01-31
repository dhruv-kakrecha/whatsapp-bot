import React, { useState } from "react";
import { Button, Col, Form, Input, message, Radio, Row, Space } from "antd";
import Buttons from "./Buttons";
import UploadMedia from "./UploadMedia";
import axios from "axios";
import { PageContainer, ProCard } from "@ant-design/pro-components";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNTVkZWQ3Mi03NTY2LTQzYjQtOTJkNi1mNzY4YTJlYjI5M2QiLCJ1bmlxdWVfbmFtZSI6IkRyZGlhbW9uZGF1dG9AZ21haWwuY29tIiwibmFtZWlkIjoiRHJkaWFtb25kYXV0b0BnbWFpbC5jb20iLCJlbWFpbCI6IkRyZGlhbW9uZGF1dG9AZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDEvMzAvMjAyNSAwODo1Nzo0MSIsInRlbmFudF9pZCI6IjM2Njk4MyIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.JXaVPPsDpgz8AJQvcmrwSRSMeaiZ_Z5mSd8BCVgGdtU"

const RichCard = ({
}) => {

    const [buttons, setButtons] = useState([
        {
            type: "quick_reply",
            parameter: {
                text: "",
                urlType: "none",
            }
        }
    ])

    const [url, setUrl] = useState("")
    const [form] = Form.useForm();

    // const handleCreateTemplate = async () => {


    //     try {
    //         const formData = await form.validateFields();

    //         const payload = {
    //             "id": "",
    //             "type": "template",
    //             "category": "MARKETING",
    //             "subCategory": "STANDARD",
    //             "buttonsType": "quick_reply_and_call_to_action",
    //             "buttons": [
    //                 {
    //                     "type": "url",
    //                     "parameter": {
    //                         "text": "Visit us",
    //                         "phoneNumber": "",
    //                         "url": "https://www.wati.io",
    //                         "urlType": "static"
    //                     }
    //                 },
    //                 {
    //                     "type": "call",
    //                     "parameter": {
    //                         "text": "Call now",
    //                         "urlType": "none",
    //                         "phoneNumber": "919999999999"
    //                     }
    //                 },
    //                 {
    //                     "type": "quick_reply",
    //                     "parameter": {
    //                         "text": "Interested",
    //                         "urlType": "none"
    //                     }
    //                 }
    //             ],
    //             "footer": formData.footer,
    //             "header": {
    //                 "type": "image",
    //                 "link": formData.image_url,
    //                 "mediaFromPC": "",
    //                 "mediaHeaderId": ""
    //             },
    //             "customParams": [],
    //             "elementName": formData.template_name,
    //             "body": formData.body,
    //             "language": "en",
    //             "client_id": "366983"
    //         }

    //         axios.post("https://wa-wati-backend.vercel.app/templates/create", payload, {
    //             headers: {
    //                 Authorization: `Bearer ${TOKEN}`
    //             }
    //         })
    //     } catch (error) {
    //         message.error("please fill all fields")
    //     }

    // }


    const handleCreateTemplate = async () => {
        try {
            // Validate the form
            const formData = await form.validateFields();

            // Create the payload
            const payload = {
                id: "",
                type: "template",
                category: "MARKETING",
                subCategory: "STANDARD",
                buttonsType: "quick_reply_and_call_to_action",
                buttons: buttons,
                footer: formData.footer,
                header: { type: "image", link: formData.image_url },
                elementName: formData.template_name,
                body: formData.body,
                language: "en",
                client_id: "366983"
            };

            const response = await axios.post("https://wa-wati-backend.vercel.app/templates/create", payload, {
                headers: { Authorization: `Bearer ${TOKEN}` }
            });

            message.success("Template created successfully!");
        } catch (error) {
            if (error.errorFields) {
                message.error("Please fill in all required fields.");
            } else if (error.response) {
                message.error("Something went wrong!");
            } else {
                message.error("An unexpected error occurred. Please try again.");
            }
        }
    };

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
                    type: "quick_reply",
                    parameter: {
                        text: "Quick reply",
                        urlType: "none",
                    }
                },
            ]);
        }
    };


    const handleButtonFieldsChange = (index, type, text, extra) => {
        const updatedButtons = [...buttons];

        updatedButtons[index] = {
            type,
            parameter: {
                text: text,
                urlType: type === "url" ? "static" : "none",
                ...(type === "call" && { phoneNumber: extra }),
                ...(type === "url" && { url: extra })
            }
        };

        setButtons(updatedButtons);
    };


    const handleDeleteButton = (index) => {
        if (buttons.length === 1) return;
        const updatedButtons = buttons?.filter((_, i) => i !== index);
        setButtons(updatedButtons);
    };

    return (
        <PageContainer
            title="Templates"
        >
            <ProCard>
                <Form form={form} layout="vertical">
                    <Col>

                        {/* Media upload */}

                        <Row gutter={[16, 24]}>
                            <Col md={24}>
                                {/* <UploadMedia url={url} handleUpload={handleUpload} /> */}
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name={"template_name"}
                                    label={"Template Name"}
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

                                        placeholder="Template Name"
                                        maxLength={200}
                                        showCount
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={12}>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name={"image_url"}
                                    label={"Image Url"}
                                    rules={[
                                        {
                                            required: true,
                                            type: "string",
                                            message: "Please enter title",
                                        },
                                    ]}
                                >
                                    <Input
                                        // onChange={(e) => handleFieldsChange(e.target.value, "title")}
                                        //   value={title}
                                        //   defaultValue={title}

                                        placeholder="Image Url"
                                        maxLength={200}
                                        showCount
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={12}>
                                <Form.Item
                                    style={{ marginBottom: "15px" }}
                                    name={"footer"}
                                    label={"Footer"}
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

                                        placeholder="Footer"
                                        maxLength={200}
                                        showCount
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={24}>
                                <Form.Item
                                    name={"body"}
                                    label={"Body"}
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
                                        placeholder="Body"
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
            </ProCard>
        </PageContainer>


    );
};

export default RichCard;