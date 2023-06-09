import { useNavigate } from "react-router-dom";

import { ITableProps } from "../models/common/common";
import { ItrainingData } from "../models/trainings";
import { IVacancie } from "../models/vacancies";

import { Table } from "antd";

export const TableComponent = (props: ITableProps) => {
    const { loading, columns, dataSource, pageSize, } = props;
    const baseURL = process.env.REACT_APP_BASE_URL;
    const navigation = useNavigate();

    return (
        <div >
            <Table loading={loading} columns={columns()} pagination={{ pageSize: pageSize }} scroll={{ y: "600px" }}
                dataSource={dataSource?.map((item: IVacancie | ItrainingData | any) => ({
                    ...item, role: item?.role?.name,
                    mediaFiles: <img style={{ display: "flex", maxWidth: "90px" }} src={baseURL + `/${item?.mediaFiles?.path}`} alt="PADC" />
                }))}
                onRow={(record) => {
                    return {
                        onClick: () => { navigation(`${record.id}`) }
                    }
                }} />
        </div>
    )
}