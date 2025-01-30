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

    useEffect(() => {
        const { data } = axios.post("https://wa-wati-backend.vercel.app/templates/create")
    }, [])

    const [url, setUrl] = useState("")
    const [form] = Form.useForm();


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
                >
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default RichCard;