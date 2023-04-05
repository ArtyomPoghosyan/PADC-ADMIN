import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { AddVacancieThunk, addVacancieResetState } from '@slices/vacancies/add-vacancies';

import { useAppDispatch } from '@hooks/hooks';

import { Response } from '@components/response';
import { SuccessResponse } from '@components/success-response';

import { IState } from '@models/common';
import { IAddVacancieData } from '@models/vacancies';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import vacancieStyle from "./vacancie.module.css";

import { Form, Button, Input, } from 'antd';
import TextArea from 'antd/es/input/TextArea';


export const AddVacancie: React.FC = () => {
    const { isLoading, isSuccess, currentVacancieError } = useSelector((state: IState) => state.addVacancie)
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (value) => {
        const data: IAddVacancieData = {
            title: value.title, shortDescription: value?.shortDescription,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        dispatch(AddVacancieThunk(data))
    }
    return (
        <div className={vacancieStyle.add_vacancie_container}>
            <div className={vacancieStyle.form_container}>
                {currentVacancieError ?
                    <Response data={{ isLoading: isLoading, isSuccess: isSuccess, error: currentVacancieError }}
                        defaultState={addVacancieResetState} /> :
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={onFinish} autoComplete="off">

                        {isSuccess ? <SuccessResponse navigate={"vacancies"} isLoading={isLoading} isSuccess={isSuccess}
                            defaultState={addVacancieResetState} /> : null}

                        <p>Title</p>
                        <Form.Item name="title">
                            <Input placeholder='Name' />
                        </Form.Item>

                        <p>Short Description</p>
                        <Form.Item name="shortDescription">
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Input Short Description"
                                autoSize={{ minRows: 3, maxRows: 8 }} />
                        </Form.Item>
                        <p>Description</p>
                        <Form.Item name="description">
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange} />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" className={vacancieStyle.button}>
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                }
            </div>
        </div>
    )
}


