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

import vacancieStyle from "./vacancie-Style.module.css";
import { useAppDispatch } from "../../hooks";
import { EditCurrentVacancieThunk } from "../../slices/vacancies/edit-Vacancie-Slice";
import { CurrentVacancieThunk, defaultState } from "../../slices/vacancies/current-Vacancie-Slice";
import { ButtonLoading } from "../../shared/button-loading";
import { IState } from "../../models/common";

export const CurrentVacancie: React.FC = () => {
    const { isLoading, isSuccess, currentVacancieData, currentVacancieError } = useSelector((state: IState) => state.currentVacancie);
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
        let desc = ""
        arg.blocks.map(item => desc += item.text)
        setEditorText(desc)

    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = () => {
        const data = { shortDescription: value, description: editorText }
        dispatch(EditCurrentVacancieThunk({ id, data }))
    }

    useEffect(() => {
        dispatch(CurrentVacancieThunk(id))
    }, [])

    useEffect(() => {
        if (currentVacancieData?.data) {
            const { shortDescription, description } = currentVacancieData.data;
            setEditorState(EditorState.createWithContent(ContentState.createFromText(description)))
            setValue(shortDescription);
            setText(description);
        }
    }, [currentVacancieData])

    return (
        <div className={vacancieStyle.form_container}>
            {(isLoadingEdit || isSuccessEdit || currentVacancieErrorEdit) ?
                <Response data={{ isLoading: isLoadingEdit, isSuccess: isSuccessEdit, error: currentVacancieErrorEdit }} defaultState={defaultState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">
                    <h2>{currentVacancieData?.data?.title}</h2>
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