import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

import trainingStyle from "../training/training-style.module.css";
import { Button, Modal, Space } from 'antd';

import { useAppDispatch } from "../../hooks";

import moment from 'moment';
import 'moment-timezone';
import { useNavigate } from "react-router-dom";
import { IRecord, IState } from "@models/common";
import { TrainingThunk } from "@slices/training/training";
import { ItrainingData } from "@models/trainings";
import { TableComponent } from "@shared/table";
import { deleteTrainingThunk } from "@slices/training/delete-training";

export const AllTrainings: React.FC = () => {

  const { isLoading, trainingData, } = useSelector((state: IState) => state.training)
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const dayFormat = 'YYYY-MM-DD';
  const dayHourFormat = 'DD/MM/YYYY HH:mm';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemId, setItems] = useState<undefined | number>();

  useEffect(() => {
    dispatch(TrainingThunk())
  }, [])

  const showModal = (event, record) => {
    event.stopPropagation();
    setIsModalOpen(true);
    setItems(record?.id)
  };

  const handleOk = () => {
    dispatch(deleteTrainingThunk(itemId))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateFormat = (date: string): string => {
    // console.log(date)
    // return (moment(date, dayFormat).format(dayHourFormat))
    // const utcTime = moment.utc(date);
    // console.log(utcTime)
    // console.log(moment.tz.guess(date))
    // const armenianTime = utcTime.tz(moment.tz.guess(date));
    // return armenianTime.format('YYYY-MM-DD HH:mm');

    console.log('date',date);
    const dateTz = moment(date).format(dayHourFormat);
    console.log("dateTzz",dateTz);

    // let u = dateTz.tz(moment.tz.guess()).format(dayHourFormat);
    // console.log(u)
    return dateTz
  }

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
          title: 'Created At',
          dataIndex: "createdAt",
          key: 'address 3',
          width: 30,
          ellipsis: true,
        },
        {
          title: 'Type',
          dataIndex: "type",
          key: 'address 2',
          width: 15,
          ellipsis: true,
        },
        {
          title: 'Image',
          dataIndex: "mediaFiles",
          key: 'address 3',
          width: 30,
          ellipsis: true,
        },
        {
          title: '',
          dataIndex: "button",
          key: 'address 3',
          width: 30,
          render: (index: number, record: IRecord) => (
            <Button danger onClick={(event) => { showModal(event, record) }} type="primary" htmlType="submit" style={{width: "110px", marginBottom: "15px" }}>
              Delete
            </Button>
          ),
         
        }
      ]
    )
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const trainings = trainingData?.data?.data?.map((item: ItrainingData, index) => {


    if (item?.description?.length > 500) {
      item?.description?.substring(0, 500)
    }

    return {
      ...item,
      index: index + 1,
      description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
      type: item?.type.charAt(0).toUpperCase() + item?.type.slice(1),
      date: item?.date,
      createdAt: dateFormat(item?.createdAt)

    }
  })
  return (
    <div className={trainingStyle.training_page_container}>

      <Modal title="Delete Training" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to delete this training?</p>
      </Modal>

      <div className={trainingStyle.button_container}>
        <Button onClick={() => { navigation("add") }} type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}>
          Add Training
        </Button>
      </div>
      <TableComponent loading={isLoading} columns={renderTable} dataSource={trainings} pageSize={10} navigationPath={"trainings"} />
    </div>
  )
}