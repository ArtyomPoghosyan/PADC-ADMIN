import React, { useEffect, useState } from 'react';
import projectStyle from "./project-Style.module.css"

import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Response } from '../../shared/response';
import { ButtonLoading } from '../../shared/button-loading';

import { EditorState, ContentState } from 'draft-js';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IState } from '../../models/common';
import { useAppDispatch } from '../../hooks';

import { EditCurrentProjectThunk, ProjectState } from '../../slices/project/edit-Project-Slice';
import { CurrentProjectThunk } from '../../slices/project/current-Projet-Slice';
import { SuccessResponse } from '../../shared/success-response';

export const CurrentProject: React.FC = () => {

    const { isLoading, currentProjectData } = useSelector((state: IState) => state.currentProject);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, currentProjectError: currentProjectErrorEdit } = useSelector((state: IState) => state.editCurrentProject);

    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorText, setEditorText] = useState("");

    const RawDraftContentState = (arg) => {
        let descriotion: string = "";
        arg.blocks.map(item => descriotion += item.text);
        setEditorText(descriotion);
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
            {currentProjectErrorEdit ?
                <Response data={{ error: currentProjectErrorEdit }}
                    defaultState={ProjectState} /> :

                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {( isSuccessEdit) ? <SuccessResponse navigate={"projects"} isLoading={isLoadingEdit} isSuccess={isSuccessEdit}
                        defaultState={ProjectState} /> : null}

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


