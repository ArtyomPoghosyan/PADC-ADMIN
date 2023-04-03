import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Input } from "antd"
import { Form } from 'antd';
import { useForm } from "antd/es/form/Form";

import contactStyle from "./contact-request-style.module.css";

import { useAppDispatch } from "../../hooks";

import { IState } from "@models/common";
import TextArea from "antd/es/input/TextArea";
import { currentContactThunk } from "@slices/contact-request/current-contact";

import { Document, Page, pdfjs } from 'react-pdf';

export const CurrentContact: React.FC = () => {

    const { contactData } = useSelector((state: IState) => state.currentContact);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pdfFile, setPdfFile] = useState("")
    const [value, setValue] = useState("");
    const [form] = useForm();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const onFinish = () => { }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
    }

    const goToNextPage = () => {
        setPageNumber(pageNumber + 1 > numPages ? numPages : pageNumber + 1);
    }

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, []);

    useEffect(() => {
        dispatch(currentContactThunk(id))
    }, [])

    useEffect(() => {
        if (contactData?.data) {
            const { name, email, phone, address, comment, mediaFiles } = contactData?.data;
            setPdfFile(mediaFiles?.path)
            form.setFieldsValue({
                name, email, phone, address, comment, mediaFiles: `${baseURL}/${pdfFile}`
            })
        }
    }, [contactData])

    const downloadFile = (url: undefined | string, pdfFile: string) => {
        console.log(typeof url, typeof pdfFile)
        const file = `${url}/${pdfFile}`
        const FileSaver = require('file-saver');
        FileSaver.saveAs(file, `${pdfFile}.docx`);
    }

    return (

        <div className={contactStyle.form_container}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
                autoComplete="off"
                className={contactStyle.user_form}>

                <div>
                    <p>Full Name</p>
                    <Form.Item name="name">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                    <p>Email</p>
                    <Form.Item name="email">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                    <p>Tel.</p>
                    <Form.Item name="phone">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                    <p>Address</p>
                    <Form.Item name="address">
                        <Input disabled placeholder='Name' />
                    </Form.Item>
                    <p>Comment</p>
                    <Form.Item name="comment">
                        <TextArea
                            disabled
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Input Short Description"
                            autoSize={{ minRows: 3, maxRows: 8 }} />
                    </Form.Item>
                    <p>Resume</p>
                    {pdfFile == undefined ? <div className={contactStyle.emptyResume_container}>
                        <p className={contactStyle.emptyResume}>The user hasn't sent resume</p>
                        </div> : <>
                        {pdfFile?.slice(-3) == "pdf" ?
                            <Form.Item name="mediaFiles">
                                <Document className={contactStyle.pdf_container} file={`${baseURL}/${pdfFile}`} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <div className={numPages == 1 ? contactStyle.button_container_hidden : contactStyle.button_container}>
                                    <Button type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}
                                        onClick={goToPrevPage}>Prev</Button>
                                    <Button type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}
                                        onClick={goToNextPage}>Next</Button>
                                </div>
                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>
                            </Form.Item> :
                            <div >
                                <Button onClick={() => { downloadFile(baseURL, pdfFile) }} type="primary" htmlType="submit" style={{ width: "120px", marginBottom: "15px" }}>
                                    Download
                                </Button>
                            </div>
                        }
                    </>}
                </div>
            </Form>
        </div>

    )
}