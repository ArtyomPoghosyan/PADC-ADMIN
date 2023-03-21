import React, { useEffect, useState } from 'react';
import trainingStyle from "./training-style.module.css"

import { Form, Input, Select, DatePicker, Upload, UploadFile, UploadProps, } from 'antd';
import { Response } from '@shared/response';

import { EditorState, ContentState } from 'draft-js';
import dayjs from 'dayjs';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import moment from 'moment';

import { useForm } from 'antd/es/form/Form';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { IState } from '../../models/common';
import { useAppDispatch } from '../../hooks';
import { IState } from '@models/common';
import { IAddTraining } from '@models/trainings';
import { EditCurrentTrainingThunk } from '@slices/training/edit-training';
import { CurrentTrainingThunk, trainingState } from '@slices/training/current-training';
import { SuccessResponse } from '@shared/success-response';
import { ButtonLoading } from '@shared/button-loading';
// import { IAddTraining } from '../../models/trainings';
// import { EditCurrentTrainingThunk, trainingState } from '../../slices/training/edit-training';
// import { CurrentTrainingThunk } from '../../slices/training/current-training';
// import { ButtonLoading } from '../../shared/button-loading';
// import { SuccessResponse } from '../../shared/success-response';

export const CurrentTraining: React.FC = () => {

    const { isLoading, isSuccess, trainingData, trainingError } = useSelector((state: IState) => state.currentTraining);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, trainingError: trainingErrorEdit } = useSelector((state: IState) => state.editCurrentTraining);
    const dispatch = useAppDispatch();
    const [dateFormat] = useState("");
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const monthFormat = "MM-DD-YYYY";
    const dayFormat = 'YYYY-MM-DD';
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [editorText, setEditorText] = useState("")

    const props: UploadProps = {
        beforeUpload: (file) => {
            const formData = new FormData();
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };

    const RawDraftContentState = (arg) => {
        let description: string = ""
        arg.blocks.map(item => description += item.text)
        setEditorText(description)
    }

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
        const { name, description, type, image } = values;
        const convertDate = moment($d, dayFormat).format(dayFormat);
        console.log(description)
        const data: IAddTraining = {
            name, description: editorText ? editorText : description,
            date: convertDate, image, type
        }
        dispatch(EditCurrentTrainingThunk({ id, data }))
    }

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };



    useEffect(() => {
        dispatch(CurrentTrainingThunk(id))
    }, [])

    useEffect(() => {
        if (trainingData?.data?.data) {
            const { name, description, date, type } = trainingData?.data?.data;
            setEditorState(EditorState.createWithContent(ContentState.createFromText(description)))
            form.setFieldsValue({
                name, description, type,
                date: dayjs(moment(date, 'YYYY-MM-DD HH:mm').format(monthFormat), monthFormat)
            })
        }
    }, [trainingData])

    return (
        <div className={trainingStyle.form_container}>
            {trainingErrorEdit ?
                <Response data={{ error: trainingError }}
                    defaultState={trainingState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {isSuccess ? <SuccessResponse navigate={"trainings"} 
                        isSuccess={isSuccessEdit} defaultState={trainingState} /> : null}

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
                            onEditorStateChange={onEditorStateChange}
                            onContentStateChange={RawDraftContentState} />

                    </Form.Item>
                    <p>Date</p>
                    <Form.Item name="date" className={trainingStyle.date_container}>
                        <DatePicker defaultValue={dayjs(dateFormat, monthFormat)} className={trainingStyle.date_picker} />
                    </Form.Item>

                    <Form.Item name="image"  >
                        <p>Image</p>
                        <Upload {...props}
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}>
                            {fileList.length < 2 && '+ Upload'}
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
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoading} />
                    </Form.Item>
                </Form>
            }
        </div>
    )
}


