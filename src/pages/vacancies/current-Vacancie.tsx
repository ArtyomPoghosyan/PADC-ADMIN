import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Response } from '../../shared/response';

import { Input } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import vacancieStyle from "./vacancie-style.module.css";
import { IState } from "../../models/common";

import { useAppDispatch } from "../../hooks";

import { EditCurrentVacancieThunk, vacancieState } from "../../slices/vacancies/edit-vacancie";
import { CurrentVacancieThunk } from "../../slices/vacancies/current-vacancie";
import { ButtonLoading } from "../../shared/button-loading";
import { SuccessResponse } from "../../shared/success-response";

export const CurrentVacancie: React.FC = () => {
    const { currentVacancieData } = useSelector((state: IState) => state.currentVacancie);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, currentVacancieError: currentVacancieErrorEdit } = useSelector((state: IState) => state.editcurrentVacnacie);

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [form] = useForm();
    const { id } = useParams();
    const { TextArea } = Input;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editorText, setEditorText] = useState("")
    const dispatch = useAppDispatch();

    const RawDraftContentState = (arg) => {
        let description: string = ""
        arg.blocks.map(item => description += item.text)
        setEditorText(description)
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = () => {
        const data = { shortDescription: value, description: editorText ? editorText : text }
        dispatch(EditCurrentVacancieThunk({ id, data }))
    }

    useEffect(() => {
        dispatch(CurrentVacancieThunk(id))
    }, [])

    useEffect(() => {
        if (currentVacancieData?.data) {
            const { title, shortDescription, description } = currentVacancieData.data;
            setEditorState(EditorState.createWithContent(ContentState.createFromText(description)))
            setValue(shortDescription);
            setText(description);
            console.log(title)
            form.setFieldsValue({ title })
        }
    }, [currentVacancieData])

    return (
        <div className={vacancieStyle.form_container}>
            {currentVacancieErrorEdit ?
                <Response data={{ error: currentVacancieErrorEdit }}
                    defaultState={vacancieState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    {(isSuccessEdit) ? <SuccessResponse navigate={"vacancies"} isLoading={isLoadingEdit}
                        isSuccess={isSuccessEdit} defaultState={vacancieState} /> : null};
                        
                    <p>Title</p>
                    <Form.Item name="title">
                        <Input placeholder="title" />
                    </Form.Item>

                    <Form.Item name="shortDescription">
                        <div style={{ margin: '24px 0' }} />
                        <p>Shor description</p>
                        <TextArea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Input short description"
                            autoSize={{ minRows: 3, maxRows: 8 }} />
                    </Form.Item>

                    <Form.Item name="description">
                        <div style={{ margin: '24px 0' }} />
                        <p>Description</p>
                        <Editor
                            defaultContentState={editorState}
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                            onContentStateChange={RawDraftContentState}
                        />
                    </Form.Item>

                    <Form.Item >
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoadingEdit} />
                    </Form.Item>
                </Form>
            }

        </div>

    )
}