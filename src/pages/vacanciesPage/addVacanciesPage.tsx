import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';

import { axiosAddVacancie, defaultState } from 'src/feature/vacancies/addVacanciePageslice';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { IState, } from 'src/interface/commonInterace/interface';
import { IAddVacancieData } from 'src/interface/vacancieInterface';
import { Response } from 'src/shared/Response';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import vacancieStyle from "./vacancieStyle.module.css";

import { Form, Button, Result, } from 'antd';
import { Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';


export const AddVacanciePage: React.FC = () => {
    const navigation = useNavigate()
    const { isLoading, isSuccess, currentVacancieData, currentVacancieError } = useSelector((state: IState) => state.addVacancie)
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = () => {
        const data: IAddVacancieData = { shortDescription: value, description: text }
        dispatch(axiosAddVacancie(data))
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


