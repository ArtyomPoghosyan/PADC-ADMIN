import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@hooks/hooks';

import { AddProjectThunk, addProjectResetState } from '@slices/projects/add-projects';

import { Form, Input, Button } from 'antd';

import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Response } from '@components/response';

import projectStyle from "./project.module.css";

import { IState } from '@models/common';
import { IAddProject } from '@models/projects';

import { SuccessResponse } from '@components/success-response';

export const AddProject: React.FC = () => {
    let { isLoading, isSuccess, addProjectDataError } = useSelector((state: IState) => state.addProject);
    const dispatch = useAppDispatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = (values) => {
        let descriptionBlock: string = "";
        let { title, description } = values;
        description?.blocks?.forEach(item => descriptionBlock += item.text);
        let data: IAddProject = { title, description: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
        dispatch(AddProjectThunk(data));
    }

    return (
        <div className={projectStyle.form_container}>
            {addProjectDataError ?
                <Response data={{ isLoading: isLoading, isSuccess: isSuccess, error: addProjectDataError }}
                    defaultState={addProjectResetState} /> :
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {isSuccess ? <SuccessResponse navigate={"projects"} isLoading={isLoading} isSuccess={isSuccess}
                        defaultState={addProjectResetState} /> : null}

                    <p>Name</p>
                    <Form.Item name="title">
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

                    <Form.Item >
                        <Button className={projectStyle.button} type="primary" htmlType="submit" >
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}


