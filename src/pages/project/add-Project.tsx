import React, { useState } from 'react';
import { Form, Input, Button, Spin, } from 'antd';
import { EditorState } from 'draft-js';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Response } from '../../shared/response';

import { useSelector } from 'react-redux';

import projectStyle from "./project-Style.module.css";
import { useAppDispatch } from '../../hooks';
import { IState } from '../../models/common';
import { IAddProject } from '../../models/projects';
import { AddProjectThunk, defaultstate } from '../../slices/project/add-Project-Slice';
import { SuccessResponse } from '../../shared/success-response';

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
        let data: IAddProject = { title, description: descriptionBlock, };
        dispatch(AddProjectThunk(data));

    }

    return (
        <div className={projectStyle.form_container}>
            {addProjectDataError ?
                <Response data={{ isLoading: isLoading, isSuccess: isSuccess, error: addProjectDataError }}
                    defaultState={defaultstate} /> :
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {isSuccess ? <SuccessResponse navigate={"projects"} isLoading={isLoading} isSuccess={isSuccess}
                        defaultState={defaultstate} /> : null}

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


