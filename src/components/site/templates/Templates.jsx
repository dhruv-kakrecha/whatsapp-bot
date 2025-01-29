/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Col, Form, Input, message, Radio, Row, Space } from "antd";
// import Text from "./Text";
// import { MediaUpload } from "../../../../MediaUpload";
import Buttons from "./Buttons";
import UploadMedia from "./UploadMedia";
import axios from "axios";

const RichCard = ({
    templateType,
    richCardDetails,
    initialValueToMedia,
    form,
    //   buttons,
    // handleAddButton = () => { },
    //   handleButtonFieldsChange = () => {},
    handleDeleteButton = () => { },
    onChoose = () => { },
    onDelete = () => { },
    handleFieldsChange = () => { },
}) => {


    // useEffect(() => {
    //     axios.post("https://wa-wati-backend.vercel.app/templates/create")
    // }, [])

    const [buttons, setButtons] = useState([])

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
    };
    // const [mediaModal, setMediaModal] = useState(true);
    const handleChoose = async (selectedImages, mediaDataWithUrls) => {
        onChoose(selectedImages, mediaDataWithUrls);
    };

    const handleDeleteMedia = async () => {
        onDelete();
    };

    return (
        <div>
            <Form form={form} layout="vertical">
                <Col>

                    {/* Media upload */}

                    <Row gutter={[16, 24]}>
                        <Col md={12}>
                            <UploadMedia />
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                style={{ marginBottom: "15px" }}
                                name={`rich_card_title_${templateType}`}
                                label={"Title"}
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: "Please enter title",
                                    },
                                    { max: 25, message: "Title must be within 25 characters" },
                                ]}
                                initialValue={richCardDetails?.title ?? ""}
                            >
                                <Input
                                    onChange={(e) => handleFieldsChange(e.target.value, "title")}
                                    //   value={title}
                                    //   defaultValue={title}

                                    placeholder="Title"
                                    maxLength={200}
                                    showCount
                                />
                            </Form.Item>
                            <Form.Item
                                // name={`rich_card_title_${templateType}`}
                                label={"Deacription"}
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: "Please enter title",
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

                    {/* <Text
            type={templateType}
            initialValue={richCardDetails?.description ?? ""}
            handleFieldsChange={handleFieldsChange}
          /> */}
                </Col>

                <Buttons
                    handleAddButton={handleAddButton}
                    buttons={buttons}
                    handleButtonFieldsChange={handleButtonFieldsChange}
                    handleDeleteButton={handleDeleteButton}
                    type={templateType}
                    form={form}
                    maxLength={3}
                />
            </Form>
        </div>
    );
};

export default RichCard;