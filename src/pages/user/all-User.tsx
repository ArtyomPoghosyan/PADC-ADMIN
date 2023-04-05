import { useEffect } from "react";
import { useSelector } from "react-redux"
import React from 'react';

import { useAppDispatch } from "@hooks/hooks";

import { IState } from "@models/common";
import { UserThunk } from "@slices/users/users";
import { TableComponent } from "@components/table";
import { dateFormater } from "@helpers/dateFormat";
import { IUSerItem } from "@models/users";

export const AllUsers: React.FC = () => {
    const { isLoading, userData, } = useSelector((state: IState) => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(UserThunk())
    }, [])

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
                    title: 'Created At',
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

    const user = userData?.data?.map((item:IUSerItem, index: number) => {
        return ({
            ...item,
            index: index + 1,
            createdAt: dateFormater(item.createdAt),
            updatedAt: dateFormater(item.updatedAt)
        }
        )
    })
    return (
        <div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={user} pageSize={10} navigationPath={"user"} />
        </div>
    )
}