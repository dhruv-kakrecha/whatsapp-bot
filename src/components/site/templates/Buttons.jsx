/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Typography,
} from "antd";
import {
    CalendarOutlined,
    CloseOutlined,
    EnvironmentOutlined,
    LinkOutlined,
    MessageOutlined,
    PhoneOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import TextArea from "antd/es/input/TextArea";
const { Title } = Typography;

const Buttons = ({
    title = "Buttons",
    type,
    handleAddButton,
    buttons,
    handleButtonFieldsChange,
    handleDeleteButton,
    required = true,
    maxLength = 4
}) => {

    const buttonData = [
        { value: 0, label: "Quick Reply" },
        { value: 1, label: "Call Button" },
        { value: 2, label: "URL Button" },
    ]
    return (
        <div>
            <Col>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <Title style={{ margin: "0px" }} level={5}>
                        {title}
                    </Title>
                    <Button
                        onClick={handleAddButton}
                        type="primary"
                        size="small"
                    >
                        <PlusOutlined /> Add Button
                    </Button>
                </div>

                <p
                    style={{
                        fontSize: "small",
                        display: "flex",
                        justifyContent: "end",
                        margin: "5px",
                        color: "gray",
                    }}
                >
                    {buttons?.length}/{maxLength}
                </p>
            </Col>

            {/* Mapping on buttons */}

            {buttons?.map((button, index) => (
                <div style={{ marginTop: "10px" }} key={index}>
                    <Col>
                        <Card key={index}>
                            <Button
                                size="small"
                                type="primary"
                                danger
                                shape="default"
                                style={{
                                    position: "absolute",
                                    top: 3,
                                    right: 3,
                                }}
                                onClick={() => handleDeleteButton(index)}
                                icon={<CloseOutlined />}
                            />

                            <Row gutter={[16, 0]}>
                                <Col md={8}>
                                    <Form.Item
                                        name={`button_type_${type}_${index}`}
                                        label="Action"
                                        initialValue={button.type}
                                    >
                                        <Select
                                            value={button.type}
                                            onChange={(value) =>
                                                handleButtonFieldsChange(index, "type", value)
                                            }
                                            style={{ width: "100%" }}
                                            options={buttonData}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col md={8}>
                                    <Form.Item
                                        name={`button_title_${type}_${index}`}
                                        rules={[
                                            {
                                                required,
                                                type: "string",
                                                message: "Please enter title",
                                            },
                                            {
                                                max: 25,
                                                message: "Title must be within 25 characters",
                                            },
                                        ]}
                                        label={"Title"}
                                        initialValue={button?.title}
                                    >
                                        <Input
                                            style={{ fontSize: "15px" }}
                                            value={button?.title ?? ""}
                                            onChange={(e) => {
                                                handleButtonFieldsChange(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="Enter Title"
                                            required
                                            maxLength={25}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>

                                {button?.type === 1 && (
                                    <Col md={8}>
                                        <Form.Item
                                            label="Phone Number"
                                            name={`button_phone_${type}_${index}`}
                                            rules={[
                                                {
                                                    required,
                                                    message: "",
                                                },
                                                () => ({
                                                    validator(rule, value) {
                                                        const valueToCheck = value?.includes("+")
                                                            ? value
                                                            : "+" + value;
                                                        const isValid = isValidPhoneNumber(valueToCheck);
                                                        if (value && isValid) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            "Please enter valid phone number"
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <PhoneInput
                                                country={"in"}
                                                inputStyle={{ width: "100%" }}
                                                name="phone"
                                                // value={contactDetails?.phone}
                                                // onChange={(phone) => {
                                                //   // setContactDetails((prev) => ({ ...prev, phone }));
                                                // }}
                                                onChange={(phone) => {
                                                    handleButtonFieldsChange(index, "phone", phone);
                                                }}
                                                placeholder="Enter Phone Number"
                                                inputProps={{
                                                    size: "large",
                                                    maxLength: 15,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                )}

                                {button?.type === 2 && (
                                    <Col md={8}>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required,
                                                    type: "url",
                                                    message: "Please enter url",
                                                },
                                            ]}
                                            name={`button_url_${type}_${index}`}
                                            label=" URL"
                                        >
                                            <Input
                                                value={button?.url}
                                                onChange={(e) => {
                                                    handleButtonFieldsChange(
                                                        index,
                                                        "url",
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter URL"
                                                required
                                            />
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>

                            {/* Button to show at bottom */}
                            <Button
                                shape="round"
                                type="default"
                                icon={
                                    <>
                                        {button?.type === 0 && <MessageOutlined />}
                                        {button?.type === 1 && <PhoneOutlined />}
                                        {button?.type === 2 && <LinkOutlined />}
                                        {button?.type === 3 && <EnvironmentOutlined />}
                                        {button?.type === 4 && <CalendarOutlined />}
                                    </>
                                }
                            >
                                {button?.type === 0 && "Quick Reply"}
                                {button?.type === 1 && "Call Button"}
                                {button?.type === 2 && "URL Button"}
                                {button?.type === 3 && "Location"}
                                {button?.type === 4 && "Calender"}
                            </Button>
                        </Card>
                    </Col>
                </div>
            ))}
        </div>
    );
};

export default Buttons;