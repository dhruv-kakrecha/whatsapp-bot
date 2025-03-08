import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd'
import React from 'react'
import axiosInstance from '../../axios/axiosInstance';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const handleLogin = async (userData) => {
        try {
            const { data } = await axiosInstance.post("auth/login", userData)

            if (data.success) {
                message.success("Login Successful");
                dispatch(login(data.token));
            } else {
                message.error(data.message);
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
                width: "25rem",
                margin: 20,
                padding: 20
            }}>
                <h2>Login</h2>
                <Form form={form} layout="vertical" onFinish={() => {
                    form.validateFields().then((values) => {
                        handleLogin(values);
                    });
                }}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Username",
                            }
                        ]}
                        required
                    >
                        <Input prefix={<UserOutlined />} placeholder="UserName" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Password",
                            }
                        ]}
                        required
                    >
                        <Input.Password prefix={<KeyOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType='submit'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
