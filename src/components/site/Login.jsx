import { IdcardOutlined, KeyOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Result } from 'antd'
import React from 'react'
import axiosInstance from '../../axios/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleLogin = async () => {
        try {
            await form.validateFields();

            const userData = form.getFieldsValue()
            // console.log("login data", data);
            const { data } = await axiosInstance.post("auth/login", userData)

            if (data.result.ok) {
                if (data.result.result) {
                    dispatch(login({
                        token: data.result.profile.token,
                        user: data.result.profile
                    }))
                    message.success("Login successful");
                } else {
                    message.error(data.result.error);
                }
            }



        } catch (error) {
            if (error.errorFields) {
                message.error("Please fill all required fields.");
            } else if (error.response) {
                message.error("Failed to login , please try again");
            } else {
                message.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Card style={{
                width: "30rem",
                margin: 20,
                padding: 20
            }}>
                <h2>Login</h2>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please input a valid email!",
                            }
                        ]}
                        required
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            }
                        ]}
                        required
                    >
                        <Input.Password prefix={<KeyOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        label="Client ID"
                        name="client_id"
                        rules={[
                            {
                                required: true,
                                message: "Please input Client ID!",
                            }
                        ]}
                        required
                    >
                        <Input prefix={<IdcardOutlined />} type="text" placeholder="Client Id" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
