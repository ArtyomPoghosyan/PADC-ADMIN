import React, { useState } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, ExpandOutlined,
    LineChartOutlined, BulbOutlined, DatabaseOutlined, ContactsOutlined
} from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';

import logo from "@assests/images/padc-logo.svg";

import mainStyle from "./main.module.css";
import { IMainIndex } from '@models/common';

export enum NavigationEnum {
    ZERO = "0",
    FIRST = "1",
    SECOND = "2",
    THIRD = "3",
    FOURTH = "4",
    FIFTH = "5",
    SIX = "6"
}

export enum NavigationPath {
    DASHBOARD = "/dashboard",
    USERS = "/users",
    TRAINING = "/trainings",
    PROJECTS = "/projects",
    VACANCIES = "/vacancies",
    CONTACTREQUEST = "/contact"
}

export const MainPage: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigationTo = (ev: IMainIndex) => {
        switch (ev.key) {
            case NavigationEnum.FIRST:
                return navigate(NavigationPath.DASHBOARD)
            case NavigationEnum.SECOND:
                return navigate(NavigationPath.USERS)
            case NavigationEnum.THIRD:
                return navigate(NavigationPath.TRAINING)
            case NavigationEnum.FOURTH:
                return navigate(NavigationPath.PROJECTS)
            case NavigationEnum.FIFTH:
                return navigate(NavigationPath.VACANCIES)
            case NavigationEnum.SIX:
                return navigate(NavigationPath.CONTACTREQUEST)
        }
    }

    const pathRender = (): string[] => {
        switch (pathname) {
            case NavigationPath.DASHBOARD:
                return [NavigationEnum.FIRST]
            case NavigationPath.USERS:
                return [NavigationEnum.SECOND]
            case NavigationPath.TRAINING:
                return [NavigationEnum.THIRD]
            case NavigationPath.PROJECTS:
                return [NavigationEnum.FOURTH]
            case NavigationPath.VACANCIES:
                return [NavigationEnum.FIFTH]
            case NavigationPath.CONTACTREQUEST:
                return [NavigationEnum.SIX]
            default:
                return [NavigationEnum.ZERO]
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
                        defaultSelectedKeys={pathRender()}
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
                                key: NavigationEnum.FIFTH,
                                icon: <ExpandOutlined />,
                                label: 'Vacancies',
                            },
                            {
                                key: NavigationEnum.SIX,
                                icon: <ContactsOutlined />,
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

