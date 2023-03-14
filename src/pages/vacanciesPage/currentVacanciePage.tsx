import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "src/hooks";

import { IState } from "src/interface/commonInterace";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { axiosCurrentVacancie } from "src/feature/vacancies/currentVacanciePageSlice";
import { axiosEditCurrentVacancie, defaultState } from "src/feature/vacancies/editCurrentVacancieSlice";
import { Response } from 'src/shared/Response';

import { Button, Input, Select } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import vacancieStyle from "./vacancieStyle.module.css";
import { ButtonLoading } from "src/shared/Button_loading";


export const CurrentVacanciePage: React.FC = () => {
    const { isLoading, isSuccess, currentVacancieData, currentVacancieError } = useSelector((state: IState) => state.currentVacancie);
    const { isLoading:isLoadingEdit,  isSuccess:isSuccessEdit, currentVacancieError:currentVacancieErrorEdit } = useSelector((state: IState) => state.editcurrentVacnacie);

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [form] = useForm();
    const { id } = useParams();
    const { TextArea } = Input;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const dispatch = useAppDispatch();

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFinish = () => {
        const data = { shortDescription: value, description: text }
        dispatch(axiosEditCurrentVacancie({ id, data }))
    }

    useEffect(() => {
        dispatch(axiosCurrentVacancie(id))
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
            {( isLoadingEdit || isSuccessEdit || currentVacancieErrorEdit) ?
                <Response data={{ isLoading: isLoadingEdit, isSuccess: isSuccessEdit, error: currentVacancieErrorEdit }} defaultState={defaultState} /> :
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish} autoComplete="off">

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
                            onEditorStateChange={onEditorStateChange} />

                    </Form.Item>

                    <Form.Item >
                        <ButtonLoading type="primary" htmlType="submit" loading={isLoadingEdit}/>
                    </Form.Item>
                </Form>
            }

        </div>

    )
}