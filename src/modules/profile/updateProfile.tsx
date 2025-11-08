import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  message,
  Row,
  Col,
  Avatar,
  Select,
  Breadcrumb,
} from "antd";
import { useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/appstore/auth/auth_api";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const brandColor = "#F15822";
const IMAGE_URL_PREFIX = import.meta.env.VITE_IMAGE_URL as string;

interface UpdateProfileFormValues {
  photo?: any[];
  enrollmentDate?: dayjs.Dayjs | null;
  graduationDate?: dayjs.Dayjs | null;
  email?: string;
  name?: string;
  mobile?: string;
  schoolName?: string;
  address?: string;
  studyType?: string;
  [key: string]: any;
}

const getFullImageUrl = (url?: string) => {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return IMAGE_URL_PREFIX + url;
};

const UpdateProfile = () => {
  const { data: profile, refetch } = useGetProfileQuery("");
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile) {
      const photoUrl = getFullImageUrl(profile.photo);
      form.setFieldsValue({
        ...profile,
        enrollmentDate: profile.enrollmentDate
          ? dayjs(profile.enrollmentDate, "MM/YYYY")
          : null,
        graduationDate: profile.graduationDate
          ? dayjs(profile.graduationDate, "MM/YYYY")
          : null,
        photo: profile.photo
          ? [
              {
                uid: "-1",
                name: "profile.jpg",
                status: "done",
                url: photoUrl,
              },
            ]
          : [],
      });
    }
  }, [profile, form]);

  const handleFinish = async (values: UpdateProfileFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "photo" && Array.isArray(value) && value.length > 0) {
        const fileObj = value[0];
        if (fileObj.originFileObj) {
          formData.append("photo", fileObj.originFileObj);
        }
      } else if (
        (key === "enrollmentDate" || key === "graduationDate") &&
        value &&
        typeof value.format === "function"
      ) {
        formData.append(key, value.format("MM/YYYY"));
      } else if (key !== "email") {
        formData.append(key, value ?? "");
      }
    });
    try {
      await updateProfile(formData).unwrap();
      message.success("Profile updated!");
      refetch();
    } catch (e: any) {
      message.error(e?.data?.message || "Update failed");
    }
  };

  const photoFileList = form.getFieldValue("photo");
  const avatarSrc =
    photoFileList && photoFileList[0]?.url
      ? photoFileList[0].url
      : getFullImageUrl(profile?.photo);

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/student/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card
          className="w-full max-w-2xl shadow-lg"
          style={{ borderRadius: 16, border: "none" }}
          bodyStyle={{ padding: 32 }}
        >
          <div className="flex flex-col items-center mb-8">
            <Avatar
              size={96}
              src={avatarSrc}
              icon={<UserOutlined />}
              style={{ backgroundColor: brandColor, marginBottom: 16 }}
            />
            <h2 className="text-2xl font-bold" style={{ color: brandColor }}>
              Update Profile
            </h2>
            <p className="text-gray-500">Keep your information up to date</p>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={profile}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Email" name="email">
                  <Input
                    readOnly
                    style={{ background: "#f5f5f5", color: "#888" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Mobile"
                  name="mobile"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Mobile Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="School Name" name="schoolName">
                  <Input placeholder="School Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24}>
                <Form.Item label="Address" name="address">
                  <Input.TextArea
                    placeholder="Mailing Address"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Enrollment Date" name="enrollmentDate">
                  <DatePicker
                    picker="month"
                    format="MM/YYYY"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Graduation Date" name="graduationDate">
                  <DatePicker
                    picker="month"
                    format="MM/YYYY"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Study Type" name="studyType">
                  <Select placeholder="Select Study Type">
                    <Select.Option value="Full-time">Full-time</Select.Option>
                    <Select.Option value="Part-time">Part-time</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Photo"
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e && e.fileList
                  }
                >
                  <Upload
                    name="photo"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    accept="image/*"
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ background: brandColor, color: "#fff" }}
                    >
                      Upload Photo
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{
                  background: brandColor,
                  borderColor: brandColor,
                  width: "100%",
                  height: 48,
                  fontSize: 18,
                  fontWeight: 600,
                  borderRadius: 8,
                  marginTop: 16,
                }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfile;
