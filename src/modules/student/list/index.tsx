import { useGetAllStudentQuery } from "@/appstore/student/api";
import BreadCrumb from "@/modules/@common/breadcrumb";
import Title from "@/modules/@common/title";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import moment from "moment";
import { useState } from "react";
import {
  AiFillQuestionCircle,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiFilterAlt, BiReset, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ClockCircleOutlined, FieldTimeOutlined } from "@ant-design/icons";
interface RoleType {
  id: number;
  name: string;
}

interface StatusType {
  id: number;
  name: string;
}

interface DataType {
  id: number;
  email: string;
  provider: string;
  socialId: string;
  name: string;
  photo: string;
  role: RoleType;
  mobile: string;
  schoolName: string;
  address: string;
  enrollmentDate: string;
  graduationDate: string;
  studyType: string;
  createdBy: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  confirmationCode: string;
  confirmationCodeExpires: string;
  resetPasswordCode: string;
  resetPasswordCodeExpires: string;
  children: string[];
}

// Define a type for filters with an index signature
type FiltersType = {
  keyword?: string;
  status?: { id: number }[];
  roles?: { id: number }[];
  studyType?: string;
  [key: string]: any; // <-- Add this line
};

const breadcrumbData = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "All Student",
  },
];

const StudentList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // State for filters and pagination
  const [filters, setFilters] = useState({
    keyword: "",
    status: undefined,
    studyType: undefined,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortInfo, setSortInfo] = useState([
    {
      orderBy: "createdAt",
      order: "DESC",
    },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<DataType | null>(null);

  const queryParams = {
    page,
    limit,
    filters: {
      keyword: filters.keyword || undefined,
      status: filters.status ? [{ id: filters.status }] : undefined,
      roles: [{ id: 2 }],
      studyType: filters.studyType || undefined,
    } as FiltersType, // <-- Cast to FiltersType
    sort: sortInfo,
  };

  Object.keys(queryParams.filters).forEach((key) => {
    if (queryParams.filters[key] === undefined) {
      delete queryParams.filters[key];
    }
  });

  console.log("Query Params:", queryParams);

  const { data, isFetching, refetch } = useGetAllStudentQuery(queryParams);

  // Modal handlers
  const showModal = (student: DataType) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Filter form submit handler
  const handleFilterSubmit = (values: any) => {
    setFilters(values);
    setPage(1); // Reset to first page with new filters
  };

  // Reset filters
  const handleResetFilters = () => {
    form.resetFields();
    setFilters({
      keyword: "",
      status: undefined,
      studyType: undefined,
    });
    setPage(1);
  };

  //  Pagination
  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    onChange: (page: number) => {
      setPage(page);
    },
    onShowSizeChange: (_: number, showItem: number) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    total: data?.total || 0,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar size={32} className="mr-2 bg-blue-500">
            {record.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{record.name}</span>
            <span className="text-xs text-gray-500">{record.role?.name}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "School",
      dataIndex: "schoolName",
      key: "schoolName",
      ellipsis: true,
    },
    {
      title: "Study Type",
      dataIndex: "studyType",
      key: "studyType",
      render: (studyType: string) => {
        let color = "";
        let icon = null;

        if (studyType === "Full-time") {
          color = "blue";
          icon = <ClockCircleOutlined className="mr-1" />;
        } else if (studyType === "Part-time") {
          color = "orange";
          icon = <FieldTimeOutlined className="mr-1" />;
        }

        return studyType ? (
          <Tag color={color} className="px-2 py-0.5 text-xs font-medium">
            {icon}
            {studyType}
          </Tag>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: ["status", "name"],
      key: "status",
      sorter: true,
      render: (text: string, record: DataType) => (
        <Tag
          color={record.status?.name === "ACTIVE" ? "success" : "error"}
          className="px-2 py-0.5 text-xs font-medium"
        >
          {record.status?.name || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (date: string) => (
        <span className="text-sm text-gray-600">
          {moment(date).format("MMM DD, YYYY")}
        </span>
      ),
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      render: (_, record: DataType) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<AiOutlineEye size={18} />}
              onClick={() => showModal(record)}
              className="text-blue-500 hover:text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Edit Student">
            <Link to={`/student/edit/${record.id}`}>
              <Button
                type="text"
                icon={<AiOutlineEdit size={18} />}
                className="text-green-500 hover:text-green-700"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Exam Details">
            <Link to={`/student/dashboard?studentId=${record.id}`}>
              <Button
                type="text"
                icon={<AiFillQuestionCircle size={18} />}
                className="text-green-500 hover:text-green-700"
              />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
    _extra: TableCurrentDataSource<DataType>
  ) => {
    // Handle pagination separately as it's managed above
    if (Array.isArray(sorter)) {
      if (sorter.length > 0) {
        setSortInfo([
          {
            orderBy: sorter[0].field as string,
            order: sorter[0].order === "descend" ? "DESC" : "ASC",
          },
        ]);
      }
    } else if (sorter.field) {
      setSortInfo([
        {
          orderBy: sorter.field as string,
          order: sorter.order === "descend" ? "DESC" : "ASC",
        },
      ]);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <BreadCrumb data={breadcrumbData} />

      <div className="flex justify-between items-center mt-4">
        <Title title="Student Management" />
        <div className="flex gap-2">
          <Link
            className="flex items-center bg-[#1D4A69] text-white px-4 py-2 rounded shadow-sm hover:bg-[#053B6A] hover:text-white transition-colors"
            to="/student/add"
          >
            <AiOutlineUserAdd className="mr-1" /> Add Student
          </Link>
        </div>
      </div>

      {/* Advanced Filter Card */}
      <Card className="mb-4 mt-4 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilterSubmit}
          initialValues={filters}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item name="keyword" label="Search">
                <Input
                  prefix={<BiSearch className="text-gray-400" />}
                  placeholder="Name, Email, Mobile..."
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item name="status" label="Status">
                <Select placeholder="All Statuses" allowClear>
                  <Select.Option key={1} value={1}>
                    Active
                  </Select.Option>
                  <Select.Option key={2} value={2}>
                    Inactive
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item name="studyType" label="Study Type">
                <Select placeholder="All Type" allowClear>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Full-time">Full-time</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button
              onClick={handleResetFilters}
              icon={<BiReset />}
              className="mr-2"
            >
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<BiFilterAlt />}
              loading={isFetching}
            >
              Apply Filters
            </Button>
          </div>
        </Form>
      </Card>

      <Card className="shadow-sm">
        <div className="overflow-auto">
          <Table
            rowKey="id"
            loading={isFetching}
            columns={columns}
            dataSource={data?.data || []}
            pagination={paginationOptions}
            onChange={handleTableChange}
            scroll={{ x: 1200 }}
            rowClassName="hover:bg-gray-50"
          />
        </div>
      </Card>

      {/* Student Detail Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <Avatar size={36} className="bg-blue-500 mr-3">
              {selectedStudent?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div>
              <div className="font-medium text-lg">{selectedStudent?.name}</div>
              <div className="text-xs text-gray-500">
                ID: {selectedStudent?.id} | Role: {selectedStudent?.role?.name}
              </div>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        className="student-detail-modal"
      >
        {selectedStudent && (
          <div className="py-2">
            <Card className="mb-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Mobile</p>
                  <p className="font-medium">
                    {selectedStudent.mobile || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Status</p>
                  <Tag
                    color={
                      selectedStudent.status?.name === "ACTIVE"
                        ? "green"
                        : "red"
                    }
                  >
                    {selectedStudent.status?.name || "N/A"}
                  </Tag>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Registered On</p>
                  <p className="font-medium">
                    {selectedStudent.createdAt
                      ? moment(selectedStudent.createdAt).format(
                          "MMMM DD, YYYY"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            <Divider orientation="left">Academic Information</Divider>

            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              className="mb-4"
            >
              <Descriptions.Item label="School Name" span={2}>
                {selectedStudent.schoolName || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Study Type">
                {selectedStudent.studyType || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Enrollment Date">
                {selectedStudent.enrollmentDate || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Graduation Date">
                {selectedStudent.graduationDate || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Contact Information</Divider>

            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              className="mb-4"
            >
              <Descriptions.Item label="Address">
                {selectedStudent.address || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <div className="flex justify-end mt-5">
              <Space>
                <Button
                  onClick={() => {
                    handleCancel();
                    navigate(`/student/edit/${selectedStudent.id}`);
                  }}
                  type="primary"
                  icon={<AiOutlineEdit className="mr-1" />}
                >
                  Edit Student
                </Button>
                <Button onClick={handleCancel}>Close</Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
