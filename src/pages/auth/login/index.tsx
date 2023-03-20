import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { LoginThunk } from '../../../slices/login/login';

import { useNavigate } from 'react-router-dom';


import LoginStyle from "./login-Style.module.css";
import logo from "../../../shared/images.ts/padc-logo.svg"

import Cookies from 'universal-cookie';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Alert } from 'antd';
import { Spin } from 'antd';
import { ILogin } from '../../../models/auth';



export const Login: React.FC = () => {
    const cookies = new Cookies();
    const { isLoading, isSuccess, loginData, loginError } = useAppSelector((state: any) => state.login);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    
    const attentionText= "Attention !! This website is only for internal usage for users certified by PADC LLC."
    const onFinish = (values: ILogin) => {
        dispatch(LoginThunk(values));
    };

    useEffect(() => {
        if (isSuccess) {
            cookies.set("accessToken", loginData.data.accessToken);
            navigation("/dashboard")
        }
    }, [isSuccess])

    return (
        <>
            <Alert className={LoginStyle.alert_message} message={attentionText} type="info" showIcon />
            <div className={LoginStyle.login_container}>
                <img className={LoginStyle.logo} src={logo} />
                <div style={{ height: "30px" }}>
                    {isLoading ? <p><Spin /></p> : ""}
                </div>
                <div style={{ height: "40px" }}>
                    {loginError ? <p className={LoginStyle.cridential_error}>{loginError}</p> : <p></p>}
                </div>
                <Form
                    style={{ width: "850px", marginTop: "10px" }}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{width:"500px"}} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            style={{width:"500px"}}
                        />
                    </Form.Item>
                    <Form.Item  className={LoginStyle.remember_me}>
                        <Form.Item className={LoginStyle.remember_me_container} name="remember" valuePropName="checked" >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ width: "500px" }} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}


