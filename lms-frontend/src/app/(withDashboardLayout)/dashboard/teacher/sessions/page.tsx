/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSessionByTeacherQuery } from "@/redux/api/session/sessionApi";
import { Button, Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { MdVideoCall } from "react-icons/md";

// Define the type for session data
type TSession = {
  id: string; // Assuming there's an ID for each session
  channelName: string; // The name of the session
  startTime: string; // Start time of the session (ISO string)
  endTime: string; // End time of the session (ISO string)
  courseId: string; // Associated course ID
  teacherId: string; // Associated teacher ID
};

const columns = [
  {
    title: "Session Name",
    dataIndex: "channelName",
    key: "channelName",
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
    render: (startTime: string) => new Date(startTime).toLocaleString(), // Format date & time
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime",
    render: (endTime: string) => new Date(endTime).toLocaleString(), // Format date & time
  },
  {
    title: "Course ID",
    dataIndex: "courseId",
    key: "courseId",
  },
  {
    title: "Teacher ID",
    dataIndex: "teacherId",
    key: "teacherId",
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: TSession) => (
      <Link href={`/join/${record.id}`}>
        <Button icon={<MdVideoCall size={20} />} type="primary">
          Join
        </Button>
      </Link>
    ),
  },
];

const TeacherSessionPage = () => {
  const { data, isLoading } = useGetSessionByTeacherQuery({});
  const sessions: TSession[] = data?.data || []; // Ensure sessions is typed as an array of TSession

  // Pagination state
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 2,
    total: sessions.length,
  });

  // Handle pagination change
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sessions</h2>
      <Table
        columns={columns}
        dataSource={sessions}
        loading={isLoading}
        rowKey={(record: TSession) => record.id} // Use record's id as row key
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TeacherSessionPage;
