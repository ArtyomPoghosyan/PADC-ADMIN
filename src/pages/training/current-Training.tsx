import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EditCurrentTrainingThunk, editTrainingResetState } from '@slices/trainings/edit-trainings';
import { CurrentTrainingThunk } from '@slices/trainings/current-trainings';

import { useAppDispatch } from '@hooks/hooks';

import trainingStyle from "./training.module.css"

import { Response } from '@components/response';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import dayjs from 'dayjs';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import moment from 'moment';

import { Form, Input, Select, DatePicker, Upload, UploadFile, UploadProps, } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

import { IState } from '@models/common';
import { IAddTraining } from '@models/trainings';

import { SuccessResponse } from '@components/success-response';
import { ButtonLoading } from '@components/button-loading';

export const CurrentTraining: React.FC = () => {

    const baseURL = process.env.REACT_APP_BASE_URL;
    const { isLoading, trainingData, trainingError } = useSelector((state: IState) => state.currentTraining);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, trainingError: trainingErrorEdit } = useSelector((state: IState) => state.editCurrentTraining);
    const dispatch = useAppDispatch();

    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const monthFormat = "MM-DD-YYYY";
    const dayFormat = 'YYYY-MM-DD';
    const dayHourFormat = 'YYYY-MM-DD HH:mm';
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const [localImage, setLocalImage] = useState<string>('');
    const [file, setFile] = useState<UploadFile | null>();

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (values) => {
        const index: number = 0 as number;
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        const { date: { $d } } = values;
        const { name, type, image } = values;
        const convertDate = moment($d, dayFormat).format(dayFormat);
        let data!: IAddTraining;
        if (file) {
            data = {
                name, description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                date: convertDate, image: file as UploadFile, type
            }
        }
        else if (!file) {
            data = {
                name, description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                date: convertDate, type
            }
        }
        dispatch(EditCurrentTrainingThunk({ id, data }))
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

    useEffect(() => {
        dispatch(CurrentTrainingThunk(id))
    }, [])

    useEffect(() => {
        if (trainingData?.data?.data) {
            const { name, description, date, type, mediaFiles } = trainingData?.data?.data;
            const contentBlock = htmlToDraft(description);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            };
            form.setFieldsValue({
                name, type,
                date: dayjs(moment(date, dayHourFormat).format(monthFormat), monthFormat)
            });
            (mediaFiles?.path) ? (setLocalImage(`${baseURL}/${mediaFiles?.path}`)) : (setLocalImage(""))

        }
    }, [trainingData])

    return (
        <div className={trainingStyle.form_container}>
            {trainingErrorEdit ?
                <Response data={{ error: trainingError }}
                    defaultState={editTrainingResetState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {(isSuccessEdit) ? <SuccessResponse navigate={"trainings"} isLoading={isLoadingEdit} isSuccess={isSuccessEdit}
                        defaultState={editTrainingResetState} /> : null}

                    <p>Name</p>
                    <Form.Item name="name">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="description">
                        <p>Description</p>
                        <Editor
                            defaultContentState={editorState}
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange} />

                    </Form.Item>
                    <p>Date</p>
                    <Form.Item name="date" className={trainingStyle.date_container}>
                        <DatePicker
                            disabledDate={(current) => {
                                return moment().add(-1, 'days') >= current ||
                                    moment().add(11, 'month') <= current;
                            }}
                            className={trainingStyle.date_picker} />
                    </Form.Item>

                    <Form.Item name="image"  >
                        <p>Image</p>
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
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoadingEdit} />
                    </Form.Item>
                </Form>
            }
        </div>
    )
}


