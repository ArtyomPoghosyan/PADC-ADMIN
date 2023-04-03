import React, { useEffect, useState } from 'react';

import { Button, Modal } from 'antd';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks';

import { useNavigate } from 'react-router-dom';
import projectStyle from "./project-style.module.css";

import { TableComponent } from '@shared/table';

import { IRecord, IState } from '@models/common';
import { IProjectData } from '@models/projects';

import { axiosProject } from '@slices/project/project';
import { deleteProjectThunk } from '@slices/project/delete-project';

export const AllProjects: React.FC = () => {

  const { isLoading, projectData } = useSelector((state: IState) => state.project)
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemId, setItems] = useState<undefined | number>();

  const showModal = (event, record) => {
    event.stopPropagation();
    setIsModalOpen(true);
    setItems(record?.id)
};

const handleOk = () => {
    dispatch(deleteProjectThunk(itemId))
    setIsModalOpen(false);
};

const handleCancel = () => {
    setIsModalOpen(false);
};

  useEffect(() => {
    dispatch(axiosProject())
  }, [])

  const renderTable = () => {
    return (
      [
        {
          title: 'N',
          dataIndex: "index",
          key: 'name',
          render: (text: string) => <a>{text}</a>,
          width: 20,
        },
        {
          title: 'Title',
          dataIndex: "title",
          key: 'age',
          width: 60,
          ellipsis: true,
        },
        {
          title: 'Description',
          dataIndex: "description",
          key: 'address 1',
          width: 300,
          ellipsis: true,
        },
        {
          title: "",
          dataIndex: "button",
          key: 'address 1',
          width: 40,
          ellipsis: true,
          render: (index: number, record: IRecord) => (
            <Button danger onClick={(event) => { showModal(event, record) }} type="primary" htmlType="submit" style={{ width: "100%", marginBottom: "15px" }}>
              Delete
            </Button>
          ),
        },
      ]
    )
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const project = projectData?.data?.map((item: IProjectData, index: number) => {
    return {
      ...item,
      description: <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>,
      index: index + 1,

    }
  })

  return (
    <div className={projectStyle.training_page_container}>

      <Modal title="Delete Project" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to delete this project?</p>
      </Modal>
      
      <div className={projectStyle.button_container}>
        <Button onClick={() => { navigation("add") }} type="primary" htmlType="submit" style={{ width: "110px", marginBottom: "15px" }}>
          Add Project
        </Button>
      </div>
      <TableComponent loading={isLoading} columns={renderTable} dataSource={project}
        pageSize={10} navigationPath={"projects"} />
    </div>
  )
};

