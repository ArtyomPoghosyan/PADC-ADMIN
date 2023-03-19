import React, { useEffect, useState } from 'react';
import projectStyle from "./project-Style.module.css"

import { Form, Input } from 'antd';
import { Response } from '../../shared/response';

import { EditorState, ContentState } from 'draft-js';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useForm } from 'antd/es/form/Form';


import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { IState } from '../../models/common';
import { useAppDispatch } from '../../hooks';
import { defaultState, EditCurrentProjectThunk } from '../../slices/project/edit-Project-Slice';
import { CurrentProjectThunk } from '../../slices/project/current-Projet-Slice';
import { ButtonLoading } from '../../shared/button-loading';



export const CurrentProject: React.FC = () => {

    const { isLoading, currentProjectData } = useSelector((state: IState) => state.currentProject);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, currentProjectError: currentProjectErrorEdit } = useSelector((state: IState) => state.editCurrentProject);
    
    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorText, setEditorText] = useState("");

    const RawDraftContentState = (arg) => {
        let desc = ""
        arg.blocks.map(item => desc += item.text)
        setEditorText(desc)
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (values) => {
        const { title, description } = values;
        const data = { title, description: editorText ? editorText : description }
        dispatch(EditCurrentProjectThunk({ id, data }))
    }

    useEffect(() => {
        dispatch(CurrentProjectThunk(id))
    }, [])

    useEffect(() => {
        if (currentProjectData?.data) {
            const { title, description } = currentProjectData?.data;
            setEditorState(EditorState.createWithContent(ContentState.createFromText(description)))
            form.setFieldsValue({ title, description })
        }
    }, [currentProjectData])

    return (
        <div className={projectStyle.form_container}>
            {(isLoadingEdit || isSuccessEdit || currentProjectErrorEdit) ?
                <Response data={{ isLoading: isLoadingEdit, isSuccess: isSuccessEdit, error: currentProjectErrorEdit }}
                    defaultState={defaultState} /> :
                   
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    <p>Title</p>
                    <Form.Item name="title">
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

                    <Form.Item >
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoading} />
                    </Form.Item>
                </Form>
            }
        </div>
    )
}


