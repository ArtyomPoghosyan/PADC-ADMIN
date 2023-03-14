import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import React from 'react';
import { TableComponent } from "../../shared/Table";
import { useAppDispatch } from "../../hooks";
import { axiosUser } from "../../feature/user/userSlice";
import { IState } from "../../interface/commonInterace/interface";

export const UserPage: React.FC = () => {
    const { isLoading, userData, } = useSelector((state: IState) => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(axiosUser())
    }, [])

    const renderTable = () => {
        return (
            [
                {
                    title: 'N',
                    dataIndex: 'id',
                    key: 'name',
                    render: (text: string) => <a>{text}</a>,
                    width: 50,
                },
                {
                    title: 'FirstName',
                    dataIndex: "firstName",
                    key: 'age',
                    width: 150,
                    ellipsis: true,
                },
                {
                    title: 'LastName',
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
            ]
        )
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    console.log(userData?.data?.role)
    return (
        <div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={userData?.data} pageSize={10} navigationPath={"user"} />
        </div>
    )
}