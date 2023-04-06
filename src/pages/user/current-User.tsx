import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CurrentUserThunk } from "@slices/users/current-users";

import { useAppDispatch } from "@hooks/hooks";

import { dateFormater } from "@helpers/dateFormat";

import { IState } from "@models/common";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Input,Form } from "antd"
import { useForm } from "antd/es/form/Form";

import userStyle from "./user.module.css";

export const CurrentUser: React.FC = () => {

    const { userData } = useSelector((state: IState) => state.currentUser);
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
            setImage(mediaFiles)
            form.setFieldsValue({
                firstName, lastName, email, role: role.name,
                createdAt: dateFormater(createdAt)
            })
        }
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
                        <img className={userStyle.mediaFiles} src={baseURL + `/${image}`} alt="PADC" />
                    </Form.Item>
                </div>

                <div>
                    <p>Name</p>
                    <Form.Item name="firstName">
                        <Input disabled placeholder='Name' />
                    </Form.Item>

                    <p>Last name</p>
                    <Form.Item name="lastName">
                        <Input disabled placeholder='Name' />
                    </Form.Item>

                    <p>Email</p>
                    <Form.Item name="email">
                        <Input disabled placeholder='Name' />
                    </Form.Item>

                    <p>Role</p>
                    <Form.Item name="role">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                    <p>Created</p>
                    <Form.Item name="createdAt">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                </div>

            </Form>
        </div>

    )
}