import { IState } from "@models/common";
import { IVacancie } from "@models/vacancies";

import { TableComponent } from "@shared/table";

import { VacancieThunk } from "@slices/vacancies/vacancie";

import { Button } from "antd";

import moment from "moment";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";

import vacancieStyle from "./vacancie-style.module.css";

export const AllVacancies: React.FC = () => {
    const { isLoading, vacancieData, } = useSelector((state: IState) => state.vacancie)
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const dayFormat = 'YYYY-MM-DD';
    const dayHourFormat='DD/MM/YYYY HH:MM';

    useEffect(() => {
        dispatch(VacancieThunk())
    }, [])

    const dateFormat = (date: string):string => {
        return (moment(date, dayFormat).format(dayHourFormat))
    }

    const renderTable = () => {
        return (
            [
                {
                    title: 'N',
                    dataIndex: "index",
                    key: 'name',
                    render: (text: string) => <a>{text}</a>,
                    width: 15,
                },
                {
                    title: 'Title',
                    dataIndex: "title",
                    key: 'name',
                    render: (text: string) => <a>{text}</a>,
                    width: 80,
                    ellipsis: true,
                },

                {
                    title: 'Short description',
                    dataIndex: "shortDescription",
                    key: 'name',
                    width: 180,
                    ellipsis: true,
                },
                {
                    title: 'Created at',
                    dataIndex: "createdAt",
                    key: 'address 2',
                    width: 35,
                    ellipsis: true,
                },
                {
                    title: 'Updated at',
                    dataIndex: "updatedAt",
                    key: 'address 2',
                    width: 35,
                    ellipsis: true,
                },
            ]
        )
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const data = vacancieData?.data?.map((item: IVacancie, index) => {
        return {
            ...item,
            index: index + 1,
            createdAt: dateFormat(item.createdAt),
            updatedAt: dateFormat(item.updatedAt)
        }
    })
    return (
        <div className={vacancieStyle.training_page_container}>
            <div className={vacancieStyle.button_container}>
                <Button onClick={() => { navigation("add") }} type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}>
                    Add Vacancie
                </Button>
            </div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={data} pageSize={10} navigationPath={'vacancies'} />
        </div>
    )
}