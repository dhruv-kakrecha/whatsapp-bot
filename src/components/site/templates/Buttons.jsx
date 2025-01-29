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

                                {/* Show phone number if button type is call */}
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
                                {/* Label for location button */}
                                {(button?.type === 3 || button?.type === 4) && (
                                    <Col md={8}>
                                        <Form.Item
                                            name={`button_label_${type}_${index}`}
                                            rules={[
                                                {
                                                    required,
                                                    type: "string",
                                                    message: "Please enter label",
                                                },
                                            ]}
                                            label="Label"
                                        >
                                            <Input
                                                value={button?.label}
                                                onChange={(e) => {
                                                    handleButtonFieldsChange(
                                                        index,
                                                        "label",
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="Enter Label"
                                                required
                                            />
                                        </Form.Item>
                                    </Col>
                                )}

                                {button?.type === 3 && (
                                    <>
                                        {/* Latitude for location  */}
                                        <Col md={8}>
                                            <Form.Item
                                                name={`button_location_latitude_${type}_${index}`}
                                                rules={[
                                                    {
                                                        required,
                                                        type: "number",
                                                        message:
                                                            "Latitude must be a number between -90 and 90",
                                                        validator: (_, value) => {
                                                            if (value && value >= -90 && value <= 90) {
                                                                return Promise.resolve();
                                                            } else {
                                                                return Promise.reject(
                                                                    new Error(
                                                                        "Longitude must be a number between -180 and 180"
                                                                    )
                                                                );
                                                            }
                                                        },
                                                    },
                                                ]}
                                                label="Latitude"
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    type={t("number")}
                                                    // value={button?.latitude}

                                                    onChange={(value) => {
                                                        handleButtonFieldsChange(index, "latitude", value);
                                                    }}
                                                    controls={false}
                                                    placeholder="Enter Latitude"
                                                    required
                                                />
                                            </Form.Item>
                                        </Col>
                                        {/* Longitude for location label */}
                                        <Col md={8}>
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required,
                                                        type: t("number"),
                                                        message:
                                                            "Longitude must be a number between -180 and 180",
                                                        validator: (_, value) => {
                                                            if (value && value >= -180 && value <= 180) {
                                                                return Promise.resolve();
                                                            } else {
                                                                return Promise.reject(
                                                                    new Error(
                                                                        "Longitude must be a number between -180 and 180"
                                                                    )
                                                                );
                                                            }
                                                        },
                                                    },
                                                ]}
                                                name={`button_location_longitude_${type}_${index}`}
                                                label="Longitude"
                                            >
                                                <InputNumber
                                                    style={{ width: "100%" }}
                                                    type={t("number")}
                                                    // min={-180}
                                                    // max={180}
                                                    // value={btn?.longitude}
                                                    // onChange={(value) => {
                                                    //   handleChange2(index, "longitude", value);
                                                    // }}
                                                    onChange={(value) => {
                                                        handleButtonFieldsChange(index, "longitude", value);
                                                    }}
                                                    controls={false}
                                                    placeholder="Enter Longitude"
                                                    required
                                                />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}

                                {button?.type === 4 && (
                                    <>
                                        {/* Start date for calender */}
                                        <Col md={8}>
                                            <Form.Item
                                                name={`button_calender_start_date_${type}_${index}`}
                                                rules={[
                                                    {
                                                        required,
                                                        message: "Please select start date",
                                                    },
                                                ]}
                                                label="Start Date"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    width="100%"
                                                    placeholder="Select start Date"
                                                    onChange={(dateString) => {
                                                        handleButtonFieldsChange(
                                                            index,
                                                            "startDate",
                                                            dateString
                                                        );
                                                    }}
                                                    required
                                                />
                                            </Form.Item>
                                        </Col>

                                        {/* End date for calender */}
                                        <Col md={8} style={{ width: "100%" }}>
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required,
                                                        message: "Please select end date",
                                                    },
                                                ]}
                                                name={`button_calender_end_date_${type}_${index}`}
                                                label="End Date"
                                            >
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    placeholder={t("enter.end.date")}
                                                    // value={btn?.endDate}
                                                    // onChange={(dateString) => {
                                                    //   handleChange2(index, "endDate", dateString);
                                                    // }}
                                                    onChange={(dateString) => {
                                                        handleButtonFieldsChange(
                                                            index,
                                                            "endDate",
                                                            dateString
                                                        );
                                                    }}
                                                    required
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col md={24}>
                                            <Form.Item
                                                label="Description"
                                                name={`calender_description_${type}_${index}`}
                                                rules={[
                                                    {
                                                        required,
                                                        message: "Please enter description",
                                                    },
                                                ]}
                                            >
                                                <TextArea
                                                    rows={2}
                                                    maxLength={161}
                                                    showCount
                                                    style={{ fontSize: "1rem" }}
                                                    onChange={(e) => {
                                                        handleButtonFieldsChange(
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </>
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