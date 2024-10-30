"use client";

import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
type TProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarHeader = ({ collapsed, setCollapsed }: TProps) => {
  return (
    <Header className="p-0 bg-gray-300">
      <Button
        type="default"
        className="ml-2"
        size="large"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
    </Header>
  );
};

export default SidebarHeader;
