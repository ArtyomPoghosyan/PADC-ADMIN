import React, { useState } from 'react';
import trainingStyle from "./training-style.module.css"
import { Form, Input, Button, Select, DatePicker, Upload, UploadFile, UploadProps } from 'antd';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Response } from '@shared/response';

import moment from 'moment';

import { useAppDispatch } from '../../hooks';

import { useSelector } from 'react-redux';
import { IState } from '@models/common';
import { IAddTraining } from '@models/trainings';
import { AddTrainingThunk, defaultState } from '@slices/training/add-training';
import { SuccessResponse } from '@shared/success-response';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import draftToHtml from 'draftjs-to-html';
import { RcFile } from 'antd/es/upload';

export const AddTraining: React.FC = () => {
    let { isLoading, isSuccess, addTrainingError } = useSelector((state: IState) => state.addTraining);
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<UploadFile | null>();

    const [localImage, setLocalImage] = useState<string>('');


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const dayFormat = 'YYYY-MM-DD';

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (values) => {
        let descriptionBlock: string = "";
        const { date: { $d } } = values;
        let { name, description, type } = values;
        const convertDate = moment($d, dayFormat).format(dayFormat);
        description?.blocks?.forEach(item => descriptionBlock += item.text);
        let data: IAddTraining = {
            name, description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            type, date: convertDate, image: file as UploadFile
        };
        dispatch(AddTrainingThunk(data));
    }

    const onChange: UploadProps['beforeUpload'] = (file, fileList) => {
        setFile(file);
        getBase64(file as RcFile, (url) => {
            setLocalImage(url);
        });
        return false;
    };

    const uploadButton = (
        <div>
            {<PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };


    return (
        <div className={trainingStyle.form_container}>
            {addTrainingError ?
                <Response data={{ isLoading: isLoading, isSuccess: isSuccess, error: addTrainingError }}
                    defaultState={defaultState} /> :
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {isSuccess ? <SuccessResponse navigate={"trainings"} isLoading={isLoading} isSuccess={isSuccess}
                        defaultState={defaultState} /> : null}

                    <p>Name</p>
                    <Form.Item name="name">
                        <Input placeholder='Name' />
                    </Form.Item>
                    <p>Description</p>
                    <Form.Item name="description">
                        <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange} />
                    </Form.Item>
                    <p>Date</p>
                    <Form.Item name="date" className={trainingStyle.date_container}>
                        <DatePicker className={trainingStyle.date_picker} />
                    </Form.Item>

                    <p>Image</p>
                    <Form.Item name="image"  >
                        <Upload
                            listType="picture-card"
                            fileList={file ? [file as UploadFile] : []}
                            beforeUpload={onChange}
                            showUploadList={false}>
                            {localImage ? <img src={localImage} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <p>Selector</p>
                    <Form.Item name="type" >
                        <Select placeholder="Choose type of paymant">
                            <Select.Option value="free">Free</Select.Option>
                            <Select.Option value="pay">Pay</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button className={trainingStyle.button} type="primary" htmlType="submit" >
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}
