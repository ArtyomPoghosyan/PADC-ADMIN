import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { TableComponent } from '../../shared/Table';
import { useAppDispatch } from '../../hooks';
import { axiosProject } from '../../feature/project/projectSlice';
import { IState } from '../../interface/commonInterace/interface';

export const ProjectPage: React.FC = () => {
  const { isLoading, projectData } = useSelector((state: IState) => state.project)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(axiosProject())
  }, [])

  const renderTable = () => {
    return (
      [
        {
          title: 'N',
          dataIndex: "id",
          key: 'name',
          render: (text: string) => <a>{text}</a>,
          width: 50,
        },
        {
          title: 'Title',
          dataIndex: "title",
          key: 'age',
          width: 150,
          ellipsis: true,
        },
        {
          title: 'Description',
          dataIndex: "description",
          key: 'address 1',
          width: 150,
          ellipsis: true,
        },
      ]
    )
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  return (
    <div>
      <TableComponent loading={isLoading} columns={renderTable} dataSource={projectData?.data}
        pageSize={10} navigationPath={"projects"} />
    </div>
  )
};

