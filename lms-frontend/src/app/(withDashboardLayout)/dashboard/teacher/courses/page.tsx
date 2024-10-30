/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllCourseByTeacherQuery } from "@/redux/api/course/courseApi";
import { useCrateSessionMutation } from "@/redux/api/session/sessionApi";
import { TCourse } from "@/types/courseType";
import { Button, Table, Modal, Form, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { toast } from "sonner";
// import moment from "moment";

const columns = (handleCreateSession: (courseId: string) => void) => [
  {
    title: "Course ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Course Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price ($)",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price}`,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: TCourse) => (
      <Button type="primary" onClick={() => handleCreateSession(record.id)}>
        Create Session
      </Button>
    ),
  },
];

type TPagination = {
  current: number;
  pageSize: number;
  total: number;
};

const TeacherCoursesPage = () => {
  const { data, isLoading } = useGetAllCourseByTeacherQuery({});
  const courses = data?.data || [];

  const [pagination, setPagination] = useState<TPagination>({
    current: 1,
    pageSize: 2,
    total: courses.length,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleCreateSession = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  const [createSession] = useCrateSessionMutation();

  const handleFormSubmit = async (values: any) => {
    const { startTime, endTime, channelName } = values;
    const data = {
      courseId: selectedCourseId,
      session: {
        startTime: startTime.format("YYYY-MM-DD HH:mm"),
        endTime: endTime.format("YYYY-MM-DD HH:mm"),
        channelName,
      },
    };

    const toastId = toast.loading("processing");
    try {
      const res = await createSession(data);
      // console.log(res)
      if (res?.data?.success === true) {
        toast.success("Session created Successfully", {
          id: toastId,
          duration: 1000,
        });
        handleModalClose();
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <Table
        columns={columns(handleCreateSession)}
        dataSource={courses}
        loading={isLoading}
        rowKey={(course: TCourse) => course.id}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
        }}
        onChange={handleTableChange}
      />

      {/* Modal for creating session */}
      <Modal
        title="Create Session"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              { required: true, message: "Please select the start time" },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select the end time" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            label="Channel Name"
            name="channelName"
            rules={[{ required: true, message: "Please enter a channel name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherCoursesPage;
