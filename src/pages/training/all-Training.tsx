import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { TrainingThunk } from "@slices/trainings/trainings";
import { deleteTrainingThunk } from "@slices/trainings/delete-trainings";

import { useAppDispatch } from "@hooks/hooks";

import trainingStyle from "../training/training.module.css";

import { Button, Modal } from 'antd';

import 'moment-timezone';

import { IRecord, IState } from "@models/common";
import { ItrainingData } from "@models/trainings";

import { TableComponent } from "@components/table";
import { dateFormater } from "@helpers/dateFormat";
import { useTranslation } from "react-i18next";

export const AllTrainings: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, trainingData, } = useSelector((state: IState) => state.training)
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemId, setItems] = useState<undefined | number>();

  useEffect(() => {
    dispatch(TrainingThunk())
  }, [])

  const showModal = (event: Event, record: IRecord) => {
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
          render: (_, record: IRecord) => (
            <Button danger onClick={(event) => { showModal(event, record) }} type="primary" htmlType="submit" style={{ width: "100%", marginBottom: "15px" }}>
              Delete
            </Button>
          ),
        }
      ]
    )
  }

  const trainings = trainingData?.data?.data?.map((item: ItrainingData, index: number) => {


    if (item?.description?.length > 500) {
      item?.description?.substring(0, 500)
    }

    return {
      ...item,
      index: index + 1,
      description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
      type: item?.type.charAt(0).toUpperCase() + item?.type.slice(1),
      date: item?.date,
      createdAt: dateFormater(item?.createdAt)
    }
  })
  return (
    <div className={trainingStyle.training_page_container}>

      <Modal title="Delete Training" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{t("DELETE_TRAINING")}</p>
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