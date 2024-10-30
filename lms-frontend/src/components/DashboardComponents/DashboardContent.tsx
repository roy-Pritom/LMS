"use client"
import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <Content
       className='container mx-auto pt-10'
        >
            {children}
        </Content>
    );
};

export default DashboardContent;