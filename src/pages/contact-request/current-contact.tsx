import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Input } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import contactStyle from "./contact-request-style.module.css";

import { useAppDispatch } from "../../hooks";


import { IState } from "@models/common";
import TextArea from "antd/es/input/TextArea";
import { currentContactThunk } from "@slices/contact-request/current-contact";

export const CurrentContact: React.FC = () => {

    const { contactData } = useSelector((state: IState) => state.currentContact);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [image, setImage] = useState();
    const [value, setValue] = useState("");
    const [form] = useForm();
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const onFinish = () => { }

    useEffect(() => {
        dispatch(currentContactThunk(id))
    }, [])


    useEffect(() => {
        if (contactData?.data) {
            const { name, email, phone, address, comment, mediaFiles } = contactData?.data;
            setImage(mediaFiles.path)
            form.setFieldsValue({
                name, email, phone, address, comment
            })
        }
    }, [contactData])

    return (

        <div className={contactStyle.form_container}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
                autoComplete="off"
                className={contactStyle.user_form}>

                <div className={contactStyle.image_container}>
                    <Form.Item name="createdAt">
                        <img className={contactStyle.mediaFiles} src={baseURL + `/${image}`} alt="PADC" />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="name">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="phone">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="address">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="comment">
                        <TextArea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Input short description"
                            autoSize={{ minRows: 3, maxRows: 8 }} />
                    </Form.Item>
                </div>
            </Form>
        </div>

    )
}