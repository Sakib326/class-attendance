import { Card, Form, Input, Button, message, Breadcrumb } from "antd";
import { useState } from "react";
import { useUpdateProfileMutation } from "@/appstore/auth/auth_api";
import { Link } from "react-router-dom";

const brandColor = "#F15822";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [showPassword, setShowPassword] = useState(false);

  const handleFinish = async (values: {
    oldPassword: string;
    password: string;
  }) => {
    try {
      await updateProfile(values).unwrap();
      message.success("Password updated successfully!");
      form.resetFields();
    } catch (e: any) {
      message.error(e?.data?.message || "Failed to update password");
    }
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/student/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Change Password</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card
          className="w-full max-w-md shadow-lg"
          style={{ borderRadius: 16, border: "none" }}
          bodyStyle={{ padding: 32 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: brandColor }}>
            Change Password
          </h2>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Current Password"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password placeholder="Current Password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your new password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
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
                  marginTop: 8,
                }}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
