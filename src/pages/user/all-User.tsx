import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import React from 'react';

import { useAppDispatch } from "../../hooks";

import moment from "moment";

import { IState } from "@models/common";
import { UserThunk } from "@slices/user/user";
import { TableComponent } from "@shared/table";

export const AllUsers: React.FC = () => {
    const { isLoading, userData, } = useSelector((state: IState) => state.user)
    const dispatch = useAppDispatch();
    const dayFormat:string = 'YYYY-MM-DD';
    const dayHourFormat:string='YYYY-MM-DD HH:mm';

    useEffect(() => {
        dispatch(UserThunk())
    }, [])

    const dateFormat = (date: string):string => {
        return (moment(date, dayFormat).format(dayHourFormat))
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
                    title: 'First name',
                    dataIndex: "firstName",
                    key: 'age',
                    width: 150,
                    ellipsis: true,
                },
                {
                    title: 'Last name',
                    dataIndex: "lastName",
                    key: 'address 1',
                    width: 150,
                    ellipsis: true,
                },
                {
                    title: 'Email',
                    dataIndex: "email",
                    key: 'address 2',
                    width: 220,
                    ellipsis: true,
                },
                {
                    title: 'Role',
                    dataIndex: "role",
                    key: 'address 2',
                    width: 100,
                    ellipsis: true,
                },
                {
                    title: 'Created',
                    dataIndex: "createdAt",
                    key: 'address 3',
                    width: 100,
                    ellipsis: true,
                },
                {
                    title: 'Updated At',
                    dataIndex: "updatedAt",
                    key: 'address 3',
                    width: 100,
                    ellipsis: true,
                },
            ]
        )
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const user = userData?.data?.map((item, index: number) => {
        return ({
            ...item,
            index: index+1,
            createdAt: dateFormat(item.createdAt),
            updatedAt: dateFormat(item.createdAt)
        }
        )
    })
    return (
        <div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={user} pageSize={10} navigationPath={"user"} />
        </div>
    )
}