import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IVacancie } from "src/interface/vacancieInterface/vacancie";
import { axiosVacancie } from "../../feature/vacancies/vacancieSlice";
import { useAppDispatch } from "../../hooks";
import { IState } from "../../interface/commonInterace/interface";
import { TableComponent } from "../../shared/Table";
import vacancieStyle from "./vacancieStyle.module.css";

export const VacanciePage: React.FC = () => {
    const { isLoading, vacancieData, } = useSelector((state: IState) => state.vacancie)
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    
    useEffect(() => {
        dispatch(axiosVacancie())
    }, [])

    const renderTable = () => {
        return (
            [
                {
                    title: 'N',
                    dataIndex: "id",
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
    const data = vacancieData?.data?.map((item: IVacancie,index) => {
        return {
            ...item,
            id:index+1,
            description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
            createdAt: moment(item.createdAt, 'YYYY-MM-DD').format('DD/MM/YYYY HH:MM')
        }
    })
    return (
        <div  className={vacancieStyle.training_page_container}>
            <div className={vacancieStyle.button_container}>
            <Button onClick={() => { navigation("add") }} type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}>
                Add Training
            </Button>
            </div>
            <TableComponent loading={isLoading} columns={renderTable} dataSource={data} pageSize={10} navigationPath={'vacancies'} />
        </div>
    )
}