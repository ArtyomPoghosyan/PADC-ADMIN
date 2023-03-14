import { Table } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ItrainingData } from "src/interface/triningInterface/trainingInterface";
import { IVacancie } from "src/interface/vacancieInterface/vacancie";
import { ITableProps } from "../interface/commonInterace/interface";

export const TableComponent = (props: ITableProps) => {
    const { loading, columns, dataSource, pageSize, } = props;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    const navigation = useNavigate();

  

    return (
        <div >
            <Table loading={loading} columns={columns()} pagination={{ pageSize: pageSize }} scroll={{y:"600px"}}
                dataSource={dataSource?.map((item: IVacancie | ItrainingData | any) => ({ ...item, role: item?.role?.name,
                mediaFiles:<img style={{display: "flex",maxWidth:"90px"}} src={baseUrl+`/${item?.mediaFiles?.path}`} alt="PADC"/>}))}
                onRow={(record) => {
                    return {
                        onClick: () => { navigation(`${record.id}`)}
                    }
                }} />
        </div>
    )
}