// import React, { useEffect } from "react";
// import {
//     Button,
//     Card,
//     Col,
//     Form,
//     Input,
//     Row,
//     Select,
//     Typography,
// } from "antd";
// import {
//     CloseOutlined,
//     LinkOutlined,
//     MessageOutlined,
//     PhoneOutlined,
//     PlusOutlined,
// } from "@ant-design/icons";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css'
// const { Title } = Typography;

// const Buttons = ({
//     title = "Buttons",
//     type,
//     handleAddButton,
//     buttons,
//     handleButtonFieldsChange,
//     handleDeleteButton,
//     required = true,
//     maxLength = 4
// }) => {

//     console.log("all buttons" , buttons);


//     let actions = [
//         { value: "quick_reply", label: "Quick Reply" },
//         { value: "call", label: "Call Button" },
//         { value: "url", label: "URL Button" },
//     ]

//     useEffect(() => {
//         const callButtons = buttons.filter(button => button.type === "call");
//         const urlButtons = buttons.filter(button => button.type === "url");

//         if (callButtons.length >= 2) {
//             actions[1].disabled = true
//         }

//         if (urlButtons.length >= 2) {
//             actions[2].disabled = true
//         }
//     }, [buttons])

//     return (
//         <div>
//             <Col>
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         marginTop: 10,
//                     }}
//                 >
//                     <Title style={{ margin: "0px" }} level={5}>
//                         {title}
//                     </Title>
//                     <Button
//                         onClick={handleAddButton}
//                         type="primary"
//                         size="small"
//                     >
//                         <PlusOutlined /> Add Button
//                     </Button>
//                 </div>

//                 <p
//                     style={{
//                         fontSize: "small",
//                         display: "flex",
//                         justifyContent: "end",
//                         margin: "5px",
//                         color: "gray",
//                     }}
//                 >
//                     {buttons?.length}/{maxLength}
//                 </p>
//             </Col>

//             {/* Mapping on buttons */}

//             {buttons?.map((button, index) => (
//                 <div style={{ marginTop: "10px" }} key={index}>
//                     <Col>
//                         <Card key={index}>
//                             <Button
//                                 size="small"
//                                 type="primary"
//                                 danger
//                                 shape="default"
//                                 style={{
//                                     position: "absolute",
//                                     top: 3,
//                                     right: 3,
//                                 }}
//                                 onClick={() => handleDeleteButton(index)}
//                                 icon={<CloseOutlined />}
//                             />

//                             <Row gutter={[16, 0]}>
//                                 <Col md={8}>
//                                     <Form.Item
//                                         name={`button_type_${type}_${index}`}
//                                         label="Action"
//                                         initialValue={button.type}
//                                     >
//                                         <Select
//                                             value={button.type}
//                                             onChange={(value) =>
//                                                 handleButtonFieldsChange(index, value)
//                                             }
//                                             style={{ width: "100%" }}
//                                             options={actions}
//                                         />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col md={8}>
//                                     <Form.Item
//                                         name={`button_title_${type}_${index}`}
//                                         rules={[
//                                             {
//                                                 required,
//                                                 type: "string",
//                                                 message: "Please enter title",
//                                             },
//                                             {
//                                                 max: 25,
//                                                 message: "Title must be within 25 characters",
//                                             },
//                                         ]}
//                                         label={"Title"}
//                                         initialValue={"button?.parameter?.text"}
//                                     >
//                                         <Input
//                                             style={{ fontSize: "15px" }}
//                                             value={"button?.parameter?.text ??"}
//                                             onChange={(e) => {
//                                                 handleButtonFieldsChange(
//                                                     index,
//                                                     "title",
//                                                     e.target.value
//                                                 );
//                                             }}
//                                             placeholder="Enter Title"
//                                             required
//                                             maxLength={25}
//                                             showCount
//                                         />
//                                     </Form.Item>
//                                 </Col>

//                                 {button?.type === 1 && (
//                                     <Col md={8}>
//                                         <Form.Item
//                                             label="Phone Number"
//                                             name={`button_phone_${type}_${index}`}
//                                             rules={[
//                                                 {
//                                                     required,
//                                                     message: "",
//                                                 },
//                                                 () => ({
//                                                     validator(rule, value) {
//                                                         const valueToCheck = value?.includes("+")
//                                                             ? value
//                                                             : "+" + value;
//                                                         const isValid = isValidPhoneNumber(valueToCheck);
//                                                         if (value && isValid) {
//                                                             return Promise.resolve();
//                                                         }
//                                                         return Promise.reject(
//                                                             "Please enter valid phone number"
//                                                         );
//                                                     },
//                                                 }),
//                                             ]}
//                                         >
//                                             <PhoneInput
//                                                 country={"in"}
//                                                 inputStyle={{ width: "100%" }}
//                                                 name="phone"
//                                                 // value={contactDetails?.phone}
//                                                 // onChange={(phone) => {
//                                                 //   // setContactDetails((prev) => ({ ...prev, phone }));
//                                                 // }}
//                                                 onChange={(phone) => {
//                                                     handleButtonFieldsChange(index, "phone", phone);
//                                                 }}
//                                                 placeholder="Enter Phone Number"
//                                                 inputProps={{
//                                                     size: "large",
//                                                     maxLength: 15,
//                                                 }}
//                                             />
//                                         </Form.Item>
//                                     </Col>
//                                 )}

//                                 {button?.type === 2 && (
//                                     <Col md={8}>
//                                         <Form.Item
//                                             rules={[
//                                                 {
//                                                     required,
//                                                     type: "url",
//                                                     message: "Please enter url",
//                                                 },
//                                             ]}
//                                             name={`button_url_${type}_${index}`}
//                                             label=" URL"
//                                         >
//                                             <Input
//                                                 value={button?.url}
//                                                 onChange={(e) => {
//                                                     handleButtonFieldsChange(
//                                                         index,
//                                                         "url",
//                                                         e.target.value
//                                                     );
//                                                 }}
//                                                 placeholder="Enter URL"
//                                                 required
//                                             />
//                                         </Form.Item>
//                                     </Col>
//                                 )}
//                             </Row>

//                             {/* Button to show at bottom */}
//                             <Button
//                                 shape="round"
//                                 type="default"
//                                 icon={
//                                     <>
//                                         {button?.type === "quick_reply" && <MessageOutlined />}
//                                         {button?.type === "call" && <PhoneOutlined />}
//                                         {button?.type === "url" && <LinkOutlined />}
//                                     </>
//                                 }
//                             >
//                                 {button?.type === "quick_reply" && "Quick Reply"}
//                                 {button?.type === "call" && "Call Button"}
//                                 {button?.type === "url" && "URL Button"}
//                             </Button>
//                         </Card>
//                     </Col>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Buttons;



import React, { useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Typography,
} from "antd";
import {
    CloseOutlined,
    LinkOutlined,
    MessageOutlined,
    PhoneOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

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

    console.log("All Buttons:", buttons);

    const actions = [
        { value: "quick_reply", label: "Quick Reply" },
        { value: "call", label: "Call Button" },
        { value: "url", label: "URL Button" },
    ];

    useEffect(() => {
        const callButtons = buttons.filter(button => button.type === "call");
        const urlButtons = buttons.filter(button => button.type === "url");

        if (callButtons.length >= 2) actions[1].disabled = true;
        if (urlButtons.length >= 2) actions[2].disabled = true;
    }, [buttons]);

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
                        disabled={buttons.length >= maxLength}
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
                    {buttons.length}/{maxLength}
                </p>
            </Col>

            {/* Mapping over buttons */}
            {buttons.map((button, index) => (
                <div style={{ marginTop: "10px" }} key={index}>
                    <Col>
                        <Card key={index}>
                            <Button
                                size="small"
                                type="primary"
                                danger
                                shape="default"
                                style={{ position: "absolute", top: 3, right: 3 }}
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
                                            onChange={(value) => handleButtonFieldsChange(index, value)}
                                            style={{ width: "100%" }}
                                            options={actions}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Button Title Field */}
                                <Col md={8}>
                                    <Form.Item
                                        name={`button_title_${type}_${index}`}
                                        label="Title"
                                        rules={[
                                            { required, message: "Please enter title" },
                                            { max: 25, message: "Title must be within 25 characters" },
                                        ]}
                                    >
                                        <Input
                                            value={button.parameter?.text}
                                            onChange={(e) => handleButtonFieldsChange(index, button.type, e.target.value)}
                                            placeholder="Enter Title"
                                            required
                                            maxLength={25}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>

                                {/* Phone Input for Call Button */}
                                {button?.type === "call" && (
                                    <Col md={8}>
                                        <Form.Item
                                            label="Phone Number"
                                            name={`button_phone_${type}_${index}`}
                                            rules={[
                                                () => ({
                                                    validator(_, value) {
                                                        if (!value) return Promise.reject("Phone number is required");
                                                        const formattedValue = value.includes("+") ? value : "+" + value;
                                                        return isValidPhoneNumber(formattedValue)
                                                            ? Promise.resolve()
                                                            : Promise.reject("Please enter a valid phone number");
                                                    },
                                                }),
                                            ]}
                                        >
                                            <PhoneInput
                                                country="in"
                                                inputStyle={{ width: "100%" }}
                                                value={button.parameter?.phoneNumber || ""}
                                                onChange={(phone) => handleButtonFieldsChange(index, "call", button.parameter?.text, phone)}
                                                placeholder="Enter Phone Number"
                                                inputProps={{ size: "large", maxLength: 15 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                )}

                                {/* URL Input for URL Button */}
                                {button?.type === "url" && (
                                    <Col md={8}>
                                        <Form.Item
                                            name={`button_url_${type}_${index}`}
                                            label="URL"
                                            rules={[{ required, type: "url", message: "Please enter a valid URL" }]}
                                        >
                                            <Input
                                                value={button.parameter?.url || ""}
                                                onChange={(e) => handleButtonFieldsChange(index, "url", button.parameter?.text, e.target.value)}
                                                placeholder="Enter URL"
                                                required
                                            />
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>

                            {/* Button Display at Bottom */}
                            <Button shape="round" type="default" icon={
                                button?.type === "quick_reply" ? <MessageOutlined /> :
                                    button?.type === "call" ? <PhoneOutlined /> :
                                        button?.type === "url" ? <LinkOutlined /> : null
                            }>
                                {actions.find(a => a.value === button.type)?.label || "Button"}
                            </Button>
                        </Card>
                    </Col>
                </div>
            ))}
        </div>
    );
};

export default Buttons;
