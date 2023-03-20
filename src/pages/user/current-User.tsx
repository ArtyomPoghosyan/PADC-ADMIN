import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Input } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import userStyle from "./user-style.module.css";
import { IState } from "../../models/common";
import { useAppDispatch } from "../../hooks";

import { ButtonLoading } from "../../shared/button-loading";

import { CurrentUserThunk } from "../../slices/user/current-user";

export const CurrentUser: React.FC = () => {

    const { isLoading, userData } = useSelector((state: IState) => state.currentUser);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [image, setImage] = useState()
    const [form] = useForm();
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const onFinish = () => { }

    useEffect(() => {
        dispatch(CurrentUserThunk(id))
    }, [])

    useEffect(() => {
        if (userData?.data) {
            const { firstName, lastName, email, role, mediaFiles, createdAt } = userData?.data;
            console.log(mediaFiles)
            setImage(mediaFiles)
            form.setFieldsValue({ firstName, lastName, email, role, mediaFiles, createdAt })
        }
        console.log(image)
    }, [userData])

    return (

        <div className={userStyle.form_container}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish} autoComplete="off"
                className={userStyle.user_form}>

                <div className={userStyle.image_container}>
                    <Form.Item name="createdAt">
                        <img style={{ display: "flex", maxWidth: "90px" }} src={baseURL + `/${image}`} alt="PADC" />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="firstName">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="lastName">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="role">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="mediaFiles">
                        <Input placeholder='Name' />
                    </Form.Item>
                </div>


            </Form>
        </div>

    )
}