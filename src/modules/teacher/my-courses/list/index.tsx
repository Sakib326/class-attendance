import { generateQueryString } from "@/helpers/utils";
import BreadCrumb from "@/modules/@common/breadcrumb";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  idx?: string;
  name: string;
  description: string;
  discount: number | string;
  expiryPeriod: number | string;
  quantity: number | string;
  unused: number | string;
  used: number | string;
}

const breadcrumbData = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "My Courses",
  },
];

const MyCourses = () => {
  const [search, setcatSearch] = useState<any>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editIdx, setEditIdx] = useState<any>();

  const data: any = [];
  const isFetching = false;
  //  Pagination
  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    onChange: (page: any) => {
      setPage(page);
    },
    onShowSizeChange: (_: any, showItem: any) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    total: data?.meta?.itemCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Course Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <p className="line-clamp-1">{record?.name ?? "N/A"}</p>
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (_, record) => <span>{(record as any)?.code ?? "N/A"}</span>,
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (_, record) => (
        <span>{(record as any)?.department ?? "N/A"}</span>
      ),
    },
    {
      title: "Class Time",
      dataIndex: "classTime",
      render: (_, record) => <span>{(record as any)?.classTime ?? "N/A"}</span>,
    },
  ];

  const tableData =
    data && data?.data && data?.data?.length > 0
      ? data.data.map((obj: any) => ({ ...obj, key: obj.idx }))
      : [];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <BreadCrumb data={breadcrumbData} />
      </div>
      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">My Courses</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div>{/* Filter will add here */}</div>
        <div className="w-full lg:w-3/12 relative">
          <Input
            type="text"
            name=""
            id=""
            placeholder="Search..."
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e: any) => setcatSearch(e.target.value)}
          />
          <BiSearch
            size={18}
            className="absolute top-[50%] translate-y-[-50%] left-2"
          />
        </div>
      </div>
      <div className="overflow-auto">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isFetching}
          pagination={paginationOptions}
        />
      </div>
    </div>
  );
};

export default MyCourses;
