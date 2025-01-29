/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Col, Form, Input, message, Radio, Row, Space } from "antd";
// import Text from "./Text";
// import { MediaUpload } from "../../../../MediaUpload";
import Buttons from "./Buttons";
import UploadMedia from "./UploadMedia";

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
    fromCarousel = false,
}) => {
    const [buttons, setButtons] = useState([{
        id: 1,
        type: 0,
        title: "Quick Reply",
        payload: "",
    }])

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
                    {/* Radio group for orientation */}
                    {!fromCarousel && (
                        <Form.Item
                            name={`rich_card_orientation_${templateType}`}
                            label={"orientation"}
                            rules={[{ required: true, message: "Orientation is required" }]}
                            initialValue={richCardDetails?.orientation ?? 0}
                        >
                            <Radio.Group
                                //   defaultValue={value}
                                value={richCardDetails?.orientation}
                                onChange={(e) => {
                                    handleFieldsChange(e.target.value, "orientation");
                                }}
                                style={{ display: "flex", gap: 20 }}
                            >
                                <div
                                    style={{
                                        border: "1px solid #D9D9D9",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Radio value={0}>{"vertical"}</Radio>
                                </div>
                                <div
                                    style={{
                                        border: "1px solid #D9D9D9",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Radio value={1}>{"horizontal"}</Radio>
                                </div>
                            </Radio.Group>
                        </Form.Item>
                    )}

                    {/* Media upload */}

                    <Row gutter={[16, 24]}>
                        <Col md={12}>
                            {/* <MediaUpload
                formItemName={`rich_card_media_${templateType}`}
                label={"media"}
                handleChoose={handleChoose}
                single
                initialValue={initialValueToMedia}
                form={form}
                templateType={templateType}
                richCardDetails={richCardDetails}
                handleDeleteImage={handleDeleteMedia}
                isRichCard
              /> */}
                            <UploadMedia />
                        </Col>
                        <Col md={12}>
                            <Form.Item
                                name={`rich_card_media_size_${templateType}`}
                                label={"size"}
                                rules={[{ required: true, message: "Select media height" }]}
                                initialValue={richCardDetails?.mediaHeight ?? 1}
                            >
                                <Radio.Group
                                    style={{ marginTop: "10px", width: "100%" }}
                                    onChange={(e) => {
                                        handleFieldsChange(e.target.value, "mediaHeight");
                                    }}
                                // value={value1}
                                // defaultValue={value1}
                                >
                                    <Space direction="vertical" style={{ width: "100%" }}>
                                        <div
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                padding: "10px 15px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Radio value={0}>Short: 112 DP</Radio>
                                        </div>
                                        <div
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                padding: "10px 15px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Radio value={1}>{"medium"}: 168 DP</Radio>
                                        </div>
                                        <div
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                padding: "10px 15px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Radio value={2}>{"tall"}: 264 DP</Radio>
                                        </div>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Title */}
                    <Form.Item
                        name={`rich_card_title_${templateType}`}
                        label={"Title"}
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: "Please enter title",
                            },
                            { max: 200, message: "Title must be within 25 characters" },
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
                    maxLength={templateType === 2 ? 4 : 2}
                />
            </Form>
        </div>
    );
};

export default RichCard;