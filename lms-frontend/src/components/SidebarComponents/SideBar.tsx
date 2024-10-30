'use client';

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { MdDashboard } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { FaVideo } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

const { Sider } = Layout;

type TProps = {
  collapsed: boolean;
};

const SideBar = ({ collapsed }: TProps) => {
  const router = useRouter();
  const menuItems = [
    { key: '1', icon: <MdDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { key: '2', icon: <SiCoursera size={20} />, label: 'Courses', path: '/dashboard/teacher/courses' },
    { key: '3', icon: <FaVideo size={20} />, label: 'Sessions', path: '/dashboard/teacher/sessions' },
  ];

  // Handle navigation on item click
  const handleMenuClick = (path: string) => {
    router.push(path);
  };
  return (
    <Sider width={230} trigger={null} collapsible collapsed={collapsed}>
      <Link href='/'>
      <Image
        src="/secondary_logo.png"
        width={100}
        height={100}
        className={`${collapsed ? 'w-20 h-20' : 'w-36 h-auto'} py-3`}
        alt="logo"
      />
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        className="font-semibold text-base text-white"
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => handleMenuClick(item.path),
        }))}
      />
    </Sider>
  );
};

export default SideBar;
