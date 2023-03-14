import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Upload, UploadFile, UploadProps, } from 'antd';

import moment from 'moment';

import { useForm } from 'antd/es/form/Form';
import { ITrainingEdit, ITrainingEditDate } from '../interface/commonInterace/interface';
import { RcFile } from 'antd/es/upload';

export const FormComponent: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onFinish = (values: ITrainingEdit) => {
        const { date: { $d } } = values;
        const convertDate = moment($d, 'YYYY-MM-DD').format('DD/MM/YYYY');
        const { name, description, type, image } = values;
        const data: ITrainingEditDate = { name, description, type, image: fileList, date: convertDate }
        console.log(data)
    }
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const [form] = useForm();

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish} autoComplete="off">

                <Form.Item name="name">
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item name="description">
                    <Input placeholder='Description' />
                </Form.Item>

                <Form.Item name="date" style={{ width: "100%" }}>
                    <DatePicker style={{ display: "flex" }} />
                </Form.Item>

                <Form.Item valuePropName="fileList">

                    <Upload
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 2 && '+ Upload'}
                    </Upload>

                </Form.Item>

                <Form.Item name="type" >
                    <Select placeholder="Choose type of paymant">
                        <Select.Option value="free">Free</Select.Option>
                        <Select.Option value="pay">Pay</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ width: "110px" }}>
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );


}