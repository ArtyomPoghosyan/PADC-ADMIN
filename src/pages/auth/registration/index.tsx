import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LoginStyle from "../login/login-Style.module.css";
import logo from "../../../shared/images.ts/logo.png";

export const Registration: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "700px" }}>
            <img className={LoginStyle.logo} src={logo} />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your firstName!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="firstName" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your lastName!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="lastName" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="roleId"
                    rules={[{ required: true, message: 'Please input your roleId!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="roleId" />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button style={{ width: "165px" }} type="primary" htmlType="submit" className="login-form-button">
                            Registration
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>




    )
}