import React, { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, message, Radio, Row, Space } from "antd";
import Buttons from "./Buttons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios/axiosInstance";

const AddTemplate = () => {

    const CLIENT_ID = useSelector(state => state.auth.user.tenantId)
    const navigate = useNavigate()
    const [buttons, setButtons] = useState([
        {
            type: "quick_reply",
            parameter: {
                text: "",
                urlType: "none",
            }
        }
    ])
    // ["quick_reply","call_to_action",] .join("_and_")
    const [url, setUrl] = useState("")
    const [startAccountIndex, setStartAccountIndex] = useState(null)
    const [endAccountIndex, setEndAccountIndex] = useState(null)

    const [form] = Form.useForm();

    useEffect(() => {
        const initValues = buttons?.reduce((acc, button, index) => {
            acc[`button_type_${index}`] = button?.type;
            acc[`button_title_${index}`] = button?.parameter?.text;
            acc[`button_phone_${index}`] = button?.parameter?.phoneNumber;
            acc[`button_url_${index}`] = button?.parameter?.url;
            return acc;
        }, {});
        form.setFieldsValue(initValues);
    }, [buttons?.length]);


    const handleCreateTemplate = async (type) => {
        try {
            const buttonsType = buttons.reduce((acc, curr) => {
                if (curr.type === "quick_reply" && !acc.includes("quick_reply")) acc.push("quick_reply");

                if ((curr.type === "call" || curr.type === "url") && !acc.includes("call_to_action")) acc.push("call_to_action");

                return acc;
            }, [])
                .sort((a, b) => a === "quick_reply" ? -1 : 1)
                .join("_and_");
            const formData = await form.validateFields();

            // Create the payload
            let payload = {
                id: "",
                type: "template",
                category: "MARKETING",
                subCategory: "STANDARD",
                buttonsType,
                buttons: buttons,
                footer: formData.footer,
                header: { type: "image", link: formData.image_url },
                elementName: formData.template_name,
                body: formData.body,
                language: "en",
            };

            if (type === "single") {
                payload.client_id = CLIENT_ID
                const { data } = await axiosInstance.post("https://wa-wati-backend.vercel.app/templates/create", payload);

                if (data.success) {
                    message.success("Template created successfully!");
                    navigate("/templates")
                }
            } else if (type === "bulk") {
                const { data } = await axiosInstance.post("https://wa-wati-backend.vercel.app/templates/create/bulk", { template: payload, "startAccountIndex": startAccountIndex, "endAccountIndex": endAccountIndex });

                if (data.success) {
                    message.success("Template created for all accounts!");
                    navigate("/templates")
                }
            }
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

    // const handleUpload = ({ file }) => {
    //     const fileUrl = URL.createObjectURL(file);
    //     setUrl(fileUrl)
    // }

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

    const startAccountNumber = (e) => {
        console.log("start", e.target.value)
        setStartAccountIndex(e.target.value)
    }
    const endAccountNumber = (e) => {
        console.log("end", e.target.value)
        setEndAccountIndex(e.target.value)
    }

    return (
        <PageContainer
            title="Create template"
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
                                            message: "Please enter template name",
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
                                            message: "Please enter valid url",
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
                                            message: "Please enter footer",
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
                    <Flex gap={15} style={{ marginTop: 25, }}>

                        <Button
                            type="primary"
                            style={{
                                padding: "10px 30px",

                            }}
                            onClick={() => handleCreateTemplate("single")}
                        >
                            Create
                        </Button>

                        <Button
                            type="primary"
                            style={{
                                padding: "10px 30px",
                            }}
                            onClick={() => handleCreateTemplate("bulk")}
                        >
                            Create For All Accounts
                        </Button>
                        {/* <div style={{ width: '100%' }}> */}
                        <Form.Item
                            // style={{ marginBottom: "15px" }}
                            name={"start account number"}
                            // label={"Start Account Number"}
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: "Please enter start account number",
                                },
                                { max: 25, message: "Title must be within 25 characters" },
                            ]}
                        >
                            <Input size="default size" onChange={(e) => { startAccountNumber(e) }} type="number" style={{ width: '100%' }} placeholder="Start Account Number" />
                        </Form.Item>
                        <Form.Item
                            // style={{ marginBottom: "15px" }}
                            name={"end account number"}
                            // label={"End Account Number"}
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: "Please enter end account number",
                                },
                                { max: 25, message: "Title must be within 25 characters" },
                            ]}
                        >
                            <Input size="default size" onChange={(e) => { endAccountNumber(e) }} type="number" style={{ width: '100%' }} placeholder="End Account Number" />
                        </Form.Item>
                        {/* </div> */}
                    </Flex>

                </Form>
            </ProCard>
        </PageContainer>
    );
};

export default AddTemplate;