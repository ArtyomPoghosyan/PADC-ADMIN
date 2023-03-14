import React, { useEffect, useState } from 'react';
import trainingStyle from "./trainingStyle.module.css"

import { Form, Input, Button, Select, DatePicker, Upload, UploadFile, UploadProps, Spin, } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { Response } from 'src/shared/Response';

import { EditorState, ContentState } from 'draft-js';
import dayjs from 'dayjs';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import moment from 'moment';

import { useForm } from 'antd/es/form/Form';

import { RcFile } from 'antd/es/upload';
import { IState, ITrainingEdit, ITrainingEditDate } from 'src/interface/commonInterace/interface';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/hooks';
import { axiosCurrentTraining } from 'src/feature/training/currentTrainingPageSlice';
import { defaultState } from 'src/feature/training/editCurrentTrainingApi';
import { useParams } from 'react-router-dom';
import { axiosEditCurrentTraining } from 'src/feature/training/editCurrentTrainingApi';
import { descriptors } from 'chart.js/dist/core/core.defaults';
import { IAddTraining } from 'src/interface/triningInterface';
import { ButtonLoading } from 'src/shared/Button_loading';

export const CurrentTrainingPage: React.FC = () => {

    const { isLoading, isSuccess, trainingData, trainingError } = useSelector((state: IState) => state.currentTraining);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit,trainingError:trainingErrorEdit } = useSelector((state: IState) => state.editCurrentTraining);
    const dispatch = useAppDispatch();
    const [dateFormat] = useState("");
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const monthFormat = "MM-DD-YYYY";
    const dayFormat = 'YYYY-MM-DD';
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const props: UploadProps = {
        beforeUpload: (file) => {
            const formData = new FormData();
            console.log(file, "file");
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };

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
        let descriptionBlocks = '';
        description?.blocks?.forEach(item => descriptionBlocks += item.text);
        const data: IAddTraining = {
            name, description: typeof description === 'string' ? description : descriptionBlocks,
            date: convertDate, image, type
        }
        dispatch(axiosEditCurrentTraining({ id, data }))
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 1500);
    }

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);

    };

    useEffect(() => {
        dispatch(axiosCurrentTraining(id))
    }, [])

    useEffect(() => {
        if (trainingData?.data?.data) {
            const { name, description, date, type } = trainingData?.data?.data;
            setEditorState(EditorState.createWithContent(ContentState.createFromText(description)))
            form.setFieldsValue({ name, description, type, date: dayjs(moment(date, 'YYYY-MM-DD HH:mm').format(monthFormat), monthFormat) })
        }
    }, [trainingData])

    return (
        <div className={trainingStyle.form_container}>
            {(isLoadingEdit || isSuccessEdit || trainingErrorEdit) ?
                <Response data={{ isLoading: isLoadingEdit, isSuccess: isSuccessEdit, error: trainingError }}
                 defaultState={defaultState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ width: "800px" }}
                    onFinish={onFinish} autoComplete="off">

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
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoading}/>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}


