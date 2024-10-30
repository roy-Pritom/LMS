"use client";
import { Layout } from "antd";
import SidebarHeader from "@/components/SidebarComponents/SidebarHeader";
import SideBar from "@/components/SidebarComponents/SideBar";
import { useState } from "react";
const { Content } = Layout;
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false); // Shared state for collapse

  return (
    <Layout className="h-screen">
      <SideBar collapsed={collapsed} />
      <Layout className="overflow-y-auto h-screen">
        <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="container mx-auto pt-10">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
