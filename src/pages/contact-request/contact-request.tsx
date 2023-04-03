import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import React from 'react';

import { useAppDispatch } from "../../hooks";

import { IState } from "@models/common";

import { TableComponent } from "@shared/table";
import { contactRequestThunk } from "@slices/contact-request/contact-request";
import { Button } from "antd";

export const ContactRequest: React.FC = () => {
    const { isLoading, contactData } = useSelector((state: IState) => state.contactRequest)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(contactRequestThunk())
    }, [])

    const downloadPDF = (event, record) => {
        event.stopPropagation();
        const fileName = record?.mediaFiles?.props?.src;
        if (record?.mediaFiles?.props?.src.endsWith("pdf")) {
            window.open(fileName)
        }
        else {
            const FileSaver = require('file-saver');
            const fileTitle=fileName.slice(40,fileName.length);
            FileSaver.saveAs(`${fileName}`,`${fileTitle}.docx`);
        }
    }

    const renderTable = () => {
        return (
            [
                {
                    title: 'N',
                    dataIndex: 'index',
                    key: 'name',
                    render: (text: string) => <a>{text}</a>,
                    width: 30,
                },
                {
                    title: 'Full Name',
                    dataIndex: "name",
                    key: 'age',
                    width: 100,
                    ellipsis: true,
                },
                {
                    title: 'Email',
                    dataIndex: "email",
                    key: 'address 2',
                    width: 100,
                    ellipsis: true,
                },
                {
                    title: 'Phone',
                    dataIndex: "phone",
                    key: 'address 1',
                    width: 100,
                    ellipsis: true,
                },

                {
                    title: 'Address',
                    dataIndex: "address",
                    key: 'address 2',
                    width: 100,
                    ellipsis: true,
                },
                {
                    title: 'Comment',
                    dataIndex: "comment",
                    key: 'address 3',
                    width: 200,
                    ellipsis: true,
                },
                {
                    title: 'File',
                    dataIndex: "mediaFiles",
                    key: 'address 3',
                    width: 100,
                    render: (index: number, record) => (
                        <Button onClick={(event) => { downloadPDF(event, record) }} type="primary" htmlType="submit" style={{ width: "100%", marginBottom: "15px" }}>
                            Download
                        </Button>
                    ),
                    ellipsis: true,
                },
            ]
        )
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const user = contactData?.data?.map((item, index: number) => {
        return ({
            ...item,
            index: index + 1,
        }
        )
    })
    return (
        <div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={user} pageSize={10} navigationPath={"contact"} />
        </div>
    )
}