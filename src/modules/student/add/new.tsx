import {
  Button,
  Spin,
  message,
  Card,
  Breadcrumb,
  Select,
  Divider,
  Form as AntForm,
  Input,
  DatePicker,
  Radio,
} from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HomeOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "@/appstore/student/api";
import moment from "moment";

interface AddStudentFormValues {
  name: string;
  mobile: string;
  email: string;
  schoolEmail: string;
  address: string;
  schoolName: string;
  enrollmentDate: string;
  graduationDate: string;
  studyType: string;
  password?: string;
  confirmPassword?: string;
  status: number;
}

const AddStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const [formError, setFormError] = useState<string | null>(null);
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch student data if editing
  const { data: studentData, isLoading: isFetching } = useGetStudentByIdQuery(
    id!,
    {
      skip: !isEdit,
    }
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Email must be valid email address")
      .required("Email is required"),
    schoolEmail: Yup.string().email("School email must be valid email address"),
    address: Yup.string().required("Mailing address is required"),
    schoolName: Yup.string().required("School name is required"),
    enrollmentDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Date format should be MM/YYYY")
      .required("Enrollment date is required"),
    graduationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Date format should be MM/YYYY")
      .required("Graduation date is required"),
    studyType: Yup.string()
      .oneOf(["Full-time", "Part-time"], "Please select a valid study type")
      .required("Study type is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include uppercase, lowercase, number and special character"
      )
      .test({
        name: "conditionalRequired",
        message: "Password is required",
        test: function (value) {
          return (
            !isEdit ||
            value !== undefined ||
            this.parent.confirmPassword === undefined
          );
        },
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .test({
        name: "conditionalRequired",
        message: "Confirm password is required",
        test: function (value) {
          return this.parent.password === undefined || value !== undefined;
        },
      }),
    status: Yup.number().oneOf([1, 2]).required("Status is required"),
  });

  // Prepare initial values
  const initialValues: AddStudentFormValues =
    isEdit && studentData
      ? {
          name: studentData.name || "",
          mobile: studentData.mobile || "",
          email: studentData.email || "",
          schoolEmail: studentData.schoolEmail || "",
          address: studentData.address || "",
          schoolName: studentData.schoolName || "",
          enrollmentDate: studentData.enrollmentDate || "",
          graduationDate: studentData.graduationDate || "",
          studyType: studentData.studyType || "",
          password: "",
          confirmPassword: "",
          status: studentData.status?.id || 1,
        }
      : {
          name: "",
          mobile: "",
          email: "",
          schoolEmail: "",
          address: "",
          schoolName: "",
          enrollmentDate: "",
          graduationDate: "",
          studyType: "",
          password: "",
          confirmPassword: "",
          status: 1,
        };

  // Add/Edit handler
  const handleSubmit = async (values: AddStudentFormValues) => {
    setFormError(null);
    try {
      const studentData = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        address: values.address,
        schoolName: values.schoolName,
        schoolEmail: values.schoolEmail,
        enrollmentDate: values.enrollmentDate,
        graduationDate: values.graduationDate,
        studyType: values.studyType,
        role: {
          id: 2, // Or your student role id
        },
        status: {
          id: values.status,
        },
        // Include password if provided (for both new and edit)
        ...(values.password ? { password: values.password } : {}),
      };

      if (isEdit) {
        await updateStudent({ id, ...studentData }).unwrap();
        message.success("Student updated successfully!");
      } else {
        await createStudent(studentData).unwrap();
        message.success("Student added successfully!");
      }
      // navigate("/students/list");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to save student. Please try again.";
      setFormError(errorMessage);
      message.error(errorMessage);
    }
  };

  if (isEdit && isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin />
      </div>
    );
  }

  const isLoading = isCreating || isUpdating;

  return (
    <div className="bg-gray-50 p-4 min-h-screen overflow-auto">
      <Breadcrumb
        items={[
          {
            title: (
              <a href="/dashboard">
                <HomeOutlined className="mr-1" />
                Dashboard
              </a>
            ),
          },
          { title: <a href="/students/list">Students</a> },
          { title: isEdit ? "Edit Student" : "Add New Student" },
        ]}
        className="py-1 px-1 mb-4"
      />

      <div className="max-w-5xl mx-auto">
        {/* Main Form Card */}
        <Card className="shadow-sm border-0 rounded-md">
          {formError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formError}</span>
            </div>
          )}

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              errors,
              values,
              touched,
              handleChange,
              setFieldValue,
            }) => (
              <Form className="w-full" autoComplete="off" noValidate>
                {/* Personal Information Section */}
                <h3 className="text-sm uppercase font-semibold text-gray-600 mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.name && touched.name
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter full name"
                    />
                    {errors.name && touched.name && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.email && touched.email
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && touched.email && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="mobile"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.mobile && touched.mobile
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter mobile number"
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.mobile}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      School Email
                    </label>
                    <Field
                      type="email"
                      name="schoolEmail"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.schoolEmail && touched.schoolEmail
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter school email"
                    />
                    {errors.schoolEmail && touched.schoolEmail && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.schoolEmail}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Mailing Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      rows={3}
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.address && touched.address
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter mailing address"
                    />
                    {errors.address && touched.address && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.address}
                      </div>
                    )}
                  </div>
                </div>

                <Divider className="my-3" />

                {/* Academic Information Section */}
                <h3 className="text-sm uppercase font-semibold text-gray-600 mb-2">
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="schoolName"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.schoolName && touched.schoolName
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter school name"
                    />
                    {errors.schoolName && touched.schoolName && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.schoolName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Study Type <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="studyType"
                      className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                        errors.studyType && touched.studyType
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Study Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </Field>
                    {errors.studyType && touched.studyType && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.studyType}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Enrollment Date <span className="text-red-500">*</span>
                    </label>
                    <AntForm.Item
                      className="mb-0"
                      validateStatus={
                        errors.enrollmentDate && touched.enrollmentDate
                          ? "error"
                          : ""
                      }
                      help={
                        errors.enrollmentDate && touched.enrollmentDate ? (
                          <div className="text-xs mt-1">
                            {errors.enrollmentDate}
                          </div>
                        ) : null
                      }
                    >
                      <DatePicker
                        onChange={(date) => {
                          setFieldValue(
                            "enrollmentDate",
                            date ? date.format("MM/YYYY") : ""
                          );
                        }}
                        picker="month"
                        format="MM/YYYY"
                        placeholder="Select enrollment date"
                        className="w-full"
                        value={
                          values.enrollmentDate
                            ? moment(values.enrollmentDate, "MM/YYYY")
                            : null
                        }
                      />
                    </AntForm.Item>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Graduation Date <span className="text-red-500">*</span>
                    </label>
                    <AntForm.Item
                      className="mb-0"
                      validateStatus={
                        errors.graduationDate && touched.graduationDate
                          ? "error"
                          : ""
                      }
                      help={
                        errors.graduationDate && touched.graduationDate ? (
                          <div className="text-xs mt-1">
                            {errors.graduationDate}
                          </div>
                        ) : null
                      }
                    >
                      <DatePicker
                        onChange={(date) => {
                          setFieldValue(
                            "graduationDate",
                            date ? date.format("MM/YYYY") : ""
                          );
                        }}
                        picker="month"
                        format="MM/YYYY"
                        placeholder="Select graduation date"
                        className="w-full"
                        value={
                          values.graduationDate
                            ? moment(values.graduationDate, "MM/YYYY")
                            : null
                        }
                      />
                    </AntForm.Item>
                  </div>
                </div>

                <Divider className="my-3" />

                {/* Account Section */}
                <h3 className="text-sm uppercase font-semibold text-gray-600 mb-2">
                  Account Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Password{" "}
                      {!isEdit && <span className="text-red-500">*</span>}
                      {isEdit && (
                        <span className="text-xs text-gray-500 font-normal ml-1">
                          (Leave blank to keep current)
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                          errors.password && touched.password
                            ? "border-red-300"
                            : "border-gray-300"
                        } pr-8`}
                        placeholder={
                          isEdit ? "Enter new password" : "Enter password"
                        }
                      />
                      <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </div>
                    </div>
                    {errors.password && touched.password && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Confirm Password{" "}
                      {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`w-full px-3 py-1.5 text-sm rounded-md border ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        } pr-8`}
                        placeholder="Confirm password"
                      />
                      <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </div>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <Radio.Group
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.target.value)}
                      buttonStyle="solid"
                      size="middle"
                    >
                      <Radio.Button value={1}>
                        <CheckCircleOutlined className="text-green-500 mr-1" />
                        Active
                      </Radio.Button>
                      <Radio.Button value={2}>
                        <MinusCircleOutlined className="text-red-500 mr-1" />
                        Inactive
                      </Radio.Button>
                    </Radio.Group>
                    {errors.status && touched.status && (
                      <div className="mt-1 text-xs text-red-600">
                        {errors.status}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                  <Button
                    onClick={() => navigate("/students")}
                    size="middle"
                    className="min-w-[100px]"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => handleSubmit()}
                    size="middle"
                    loading={isLoading}
                    className="bg-[#F15822] hover:!bg-[#e04e00] min-w-[100px] ml-auto"
                  >
                    {isEdit ? "Update Student" : "Add Student"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default AddStudent;
