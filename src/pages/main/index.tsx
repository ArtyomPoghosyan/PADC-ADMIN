import React, { useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, ExpandOutlined,
    LineChartOutlined, BulbOutlined, DatabaseOutlined
} from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';

import logo from "@assests/images/padc-logo.svg";

import mainStyle from "./main-style.module.css";
import { IMainIndex } from '@models/common';

export enum NavigationEnum {
    FIRST = "1",
    SECOND = "2",
    THIRD = "3",
    FOURTH = "4",
    FIVTH = "5",
    SIX = "6"
}

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigationTo = (ev: IMainIndex) => {
        switch (ev.key) {
            case NavigationEnum.FIRST:
                return navigate("/dashboard")
            case NavigationEnum.SECOND:
                return navigate("/users")
            case NavigationEnum.THIRD:
                return navigate("/trainings")
            case NavigationEnum.FOURTH:
                return navigate("/projects")
            case NavigationEnum.FIVTH:
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
                        defaultSelectedKeys={[NavigationEnum.FIRST]}
                        items={[
                            {
                                key: NavigationEnum.FIRST,
                                icon: <LineChartOutlined />,
                                label: 'Dashboard',
                            },

                            {
                                key: NavigationEnum.SECOND,
                                icon: <TeamOutlined />,
                                label: 'Users',
                            },

                            {
                                key: NavigationEnum.THIRD,
                                icon: <BulbOutlined />,
                                label: 'Trainings',
                            },
                            {
                                key: NavigationEnum.FOURTH,
                                icon: <DatabaseOutlined />,
                                label: 'Projects',
                            },
                            {
                                key: NavigationEnum.FIVTH,
                                icon: <ExpandOutlined />,
                                label: 'Vacancies',
                            },
                            {
                                key: NavigationEnum.SIX,
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
                            marginLeft: "0",
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

