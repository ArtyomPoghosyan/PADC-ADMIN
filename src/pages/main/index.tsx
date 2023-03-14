import React, { useEffect, useState } from 'react';

import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IMainIndex } from '../../interface/commonInterace/interface';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, ExpandOutlined,
    LineChartOutlined, BulbOutlined, DatabaseOutlined } from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';

import logo from "../../shared/images.ts/padc-logo.svg";

import mainStyle from "./mainStyle.module.css";

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { userparam } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();



    const navigationTo = (ev: IMainIndex) => {
        console.log(ev.key)
        switch (ev.key) {
            case "1":
                return navigate("/dashboard")
            case "2":
                return navigate("/users")
            case "3":
                return navigate("/trainings")
            case "4":
                return navigate("/projects")
            case "5":
                return navigate("/vacancies")
        }
    }

    return (
        <div className={mainStyle.layout_container}>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} width="250">
                    <div className="logo" />
                    <div className={mainStyle.logo_container}>
                        <img className={mainStyle.logo} src={logo} />
                    </div>

                    <Menu
                        onClick={(ev: IMainIndex) => { navigationTo(ev) }}
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <LineChartOutlined />,
                                label: 'Dashboard',
                            },

                            {
                                key: '2',
                                icon: <TeamOutlined />,
                                label: 'Users',
                            },

                            {
                                key: '3',
                                icon: <BulbOutlined />,
                                label: 'Trainings',
                            },
                            {
                                key: '4',
                                icon: <DatabaseOutlined />,
                                label: 'Projects',
                            },
                            {
                                key: '5',
                                icon: <ExpandOutlined />,
                                label: 'Vacancies',
                            },
                            {
                                key: '6',
                                icon: <ExpandOutlined />,
                                label: 'Contact Requests',
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className={mainStyle.header_container}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: colorBgContainer,
                        }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

