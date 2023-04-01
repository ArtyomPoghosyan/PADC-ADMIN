import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { useNavigate } from 'react-router-dom';

import LoginStyle from "./login-Style.module.css";
import logo from "@assests/images/padc-logo.svg"
import Cookies from 'universal-cookie';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Alert } from 'antd';
import { Spin } from 'antd';
import { ILogin } from '@models/auth';
import { LoginThunk } from '@slices/login/login';
import { useForm } from 'antd/es/form/Form';

export const Login: React.FC = () => {
    const cookies = new Cookies();
    const { isLoading, isSuccess, loginData, loginError } = useAppSelector((state: any) => state.login);
    const [form] = useForm()
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const [backError, setBackError] = useState([])
    const [componentDisabled, setComponentDisabled] = useState(false)
    const attentionText = "Attention !! This website is only for internal usage for users certified by PADC LLC.";

    const onFinish = (values: ILogin) => {
        if (values?.remember) {
            cookies.set("rememberMe", JSON.stringify({ email: values.email, password: values.password }));
        }
        dispatch(LoginThunk(values));
    };

    useEffect(() => {
        if (isSuccess) {
            cookies.set("accessToken", loginData?.data?.accessToken);
            navigation("/dashboard")
        }

    }, [isSuccess])

    useEffect(() => {
        if (cookies.get("rememberMe")) {
            const { email, password } = cookies.get("rememberMe")
            form.setFieldsValue({ email, password })
        }
    }, [])

    return (
        <>
            <Alert className={LoginStyle.alert_message} message={attentionText} type="info" showIcon />
            <div className={LoginStyle.login_container}>
                <div className={LoginStyle.logo_container}>
                    <img className={LoginStyle.logo} src={logo} />
                </div>
                <div style={{ height: "30px" }}>
                    {isLoading ? <p><Spin /></p> : ""}
                </div>
                <div style={{ height: "40px" }}>
                    {loginError ? <p className={LoginStyle.cridential_error}>{loginError}</p> : <p></p>}
                </div>
                <div className={LoginStyle.form_container}>
                    <Form
                        form={form}
                        style={{ width: "850px", marginTop: "10px" }}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item style={{ width: "500px", flexWrap: "nowrap" }}
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{ width: "500px" }} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            style={{ width: "528px", flexWrap: "nowrap" }}
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                style={{ width: "500px" }}
                            />
                        </Form.Item>
                        <Form.Item className={LoginStyle.remember_me}>
                            <Form.Item className={LoginStyle.remember_me_container} name="remember" valuePropName="checked">
                                <Checkbox style={{ width: "58%" }}
                                    checked={componentDisabled}
                                    onChange={(e) => setComponentDisabled(e.target.checked)} >Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={isLoading} style={{ width: "500px" }} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}


