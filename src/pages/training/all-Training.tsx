import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { ItrainingData } from "../../models/trainings/trainings";
import trainingStyle from "../training/training-Style.module.css";
import { Button, Space } from 'antd';
import { TableComponent } from "../../shared/table";
import { useAppDispatch } from "../../hooks";
import { TrainingThunk } from "../../slices/training/training-Slice";
import { IState } from "../../models/common/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const AllTrainings: React.FC = () => {

  const { isLoading, trainingData, } = useSelector((state: IState) => state.training)
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  
  useEffect(() => {
    dispatch(TrainingThunk())

  }, [])

  const renderTable = () => {
    return (
      [
        {
          title: 'N',
          dataIndex: 'index',
          key: 'name',
          render: (text: number) => <a>{text}</a>,
          width: 10,
        },
        {
          title: 'Name',
          dataIndex: "name",
          key: 'age',
          width: 25,
          ellipsis: true,
        },
        {
          title: 'Description',
          dataIndex: "description",
          key: 'address 1',
          width: 150,
          innerHeight: 15,
          ellipsis: true,
        },
        {
          title: 'Date',
          dataIndex: "date",
          key: 'address 2',
          width: 30,
          ellipsis: true,
        },
        {
          title: 'Type',
          dataIndex: "type",
          key: 'address 2',
          width: 20,
          ellipsis: true,
        },
        {
          title: 'Image',
          dataIndex: "mediaFiles",
          key: 'address 3',
          width: 30,
          ellipsis: true,
        },
      ]
    )
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const tainings = trainingData?.data?.data?.map((item: ItrainingData, index) => {


    if (item?.description?.length > 500) {
      item?.description?.substring(0, 500)
    }

    return {
      ...item,
      index: index + 1,
      description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
      date: moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY HH:MM')

    }
  })
  return (
    <div className={trainingStyle.training_page_container}>
      <div className={trainingStyle.button_container}>
        <Button onClick={() => { navigation("add") }} type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}>
          Add Training
        </Button>
      </div>
      <TableComponent loading={isLoading} columns={renderTable} dataSource={tainings} pageSize={10} navigationPath={"trainings"} />
    </div>
  )
}