import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Response } from '../../shared/response';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import vacancieStyle from "./vacancie-Style.module.css";

import { Form, Button, Input, } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IState } from '../../models/common';
import { useAppDispatch } from '../../hooks';
import { IAddVacancieData } from '../../models/vacancies';
import { AddVacancieThunk, defaultState } from '../../slices/vacancies/add-Vacancie-slice';


export const AddVacancie: React.FC = () => {
    const navigation = useNavigate()
    const { isLoading, isSuccess, currentVacancieData, currentVacancieError } = useSelector((state: IState) => state.addVacancie)
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (value) => {
        let descriptionBlock = "";
        value?.description?.blocks.map(item => descriptionBlock += item.text);
        const data: IAddVacancieData = { title: value.title, shortDescription: value?.shortDescription, description: descriptionBlock }
        dispatch(AddVacancieThunk(data))
    }
    return (
        <div className={vacancieStyle.add_vacancie_container}>
            <div className={vacancieStyle.form_container}>
                {(isLoading || isSuccess || currentVacancieError) ?
                    <Response data={{ isLoading: isLoading, isSuccess: isSuccess, error: currentVacancieError }} defaultState={defaultState} /> :
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={onFinish} autoComplete="off">

                        <p>Title</p>
                        <Form.Item name="title">
                            <Input placeholder='Name' />
                        </Form.Item>

                        <p>Shor description</p>
                        <Form.Item name="shortDescription">
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Input short description"
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


