import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Response } from '../../shared/response';

import { Input } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import userStyle from "./user-Style.module.css";
import { IState } from "../../models/common";
import { useAppDispatch } from "../../hooks";
import { EditCurrentVacancieThunk } from "../../slices/vacancies/edit-Vacancie-Slice";
import { CurrentVacancieThunk } from "../../slices/vacancies/current-Vacancie-Slice";
import { ButtonLoading } from "../../shared/button-loading";
import { defaultState } from "../../slices/user/user-Slice";


export const CurrentUser: React.FC = () => {
    const { currentVacancieData } = useSelector((state: IState) => state.currentVacancie);
    const { isLoading: isLoadingEdit, isSuccess: isSuccessEdit, currentVacancieError: currentVacancieErrorEdit } = useSelector((state: IState) => state.editcurrentVacnacie);

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [form] = useForm();
    const { id } = useParams();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const dispatch = useAppDispatch();

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = () => {
        const data = { shortDescription: value, description: text }
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
        <div className={userStyle.form_container}>
            {(isLoadingEdit || isSuccessEdit || currentVacancieErrorEdit) ?
                <Response data={{ isLoading: isLoadingEdit, isSuccess: isSuccessEdit, error: currentVacancieErrorEdit }} defaultState={defaultState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

                    <Form.Item name="firstName">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="lastName">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="role">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="mediaFiles">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item name="createdAt">
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item >
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoadingEdit} />
                    </Form.Item>
                </Form>
            }

        </div>

    )
}