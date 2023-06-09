import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { VacancieThunk } from "../../slices/vacancies/vacancie";
import { useAppDispatch } from "../../hooks";
import { IState } from "../../models/common/common";
import { TableComponent } from "../../shared/table";
import vacancieStyle from "./vacancie-style.module.css";
import { IVacancie } from "../../models/vacancies";

export const AllVacancies: React.FC = () => {
    const { isLoading, vacancieData, } = useSelector((state: IState) => state.vacancie)
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    useEffect(() => {
        dispatch(VacancieThunk())
    }, [])

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
            description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
            createdAt: moment(item.createdAt, 'YYYY-MM-DD').format('DD/MM/YYYY HH:MM')
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