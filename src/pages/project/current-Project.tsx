import React, { useEffect, useState } from 'react';
import projectStyle from "./project.module.css"

import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EditCurrentProjectThunk, EditProjectResetState } from '@slices/projects/edit-projects';
import { CurrentProjectThunk } from '@slices/projects/current-projets';

import { useAppDispatch } from '@hooks/hooks';

import { Response } from '@components/response';

import { EditorState, ContentState,convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { IState } from '@models/common';
import {IProjectDatas } from '@models/projects';

import { SuccessResponse } from '@components/success-response';
import { ButtonLoading } from '@components/button-loading';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export const CurrentProject: React.FC = () => {

    const { isLoading, currentProjectData } = useSelector((state: IState) => state.currentProject);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, currentProjectError: currentProjectErrorEdit } = useSelector((state: IState) => state.editCurrentProject);

    const dispatch = useAppDispatch();
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const RawDraftContentState = (arg) => {
        let description: string = "";
        arg.blocks.map(item => description += item.text);
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (values) => {
        const { title } = values;
        const data:IProjectDatas = { title, description: draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        dispatch(EditCurrentProjectThunk({ id, data }))
    }

    useEffect(() => {
        dispatch(CurrentProjectThunk(id))
    }, [])

    useEffect(() => {
        if (currentProjectData?.data) {
            const { title, description } = currentProjectData?.data;
            const contentBlock = htmlToDraft(description);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
            form.setFieldsValue({ title, editorState })
        }
    }, [currentProjectData])

    return (
        <div className={projectStyle.form_container}>
            {currentProjectErrorEdit ?
                <Response data={{ error: currentProjectErrorEdit }}
                    defaultState={EditProjectResetState} /> :

                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {( isSuccessEdit) ? <SuccessResponse navigate={"projects"} isLoading={isLoadingEdit} isSuccess={isSuccessEdit}
                        defaultState={EditProjectResetState} /> : null}

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


