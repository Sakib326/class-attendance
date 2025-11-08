import {
  Button,
  Steps,
  Spin,
  message,
  Card,
  Progress,
  Breadcrumb,
  Select,
} from "antd";
import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "@/appstore/student/api";
import PersonalInfoStep from "@/modules/auth/register/components/PersonalInfoStep";
import ContactInfoStep from "@/modules/auth/register/components/ContactInfoStep";
import AcademicInfoStep from "@/modules/auth/register/components/AcademicInfoStep";
import PasswordStep from "@/modules/auth/register/components/PasswordStep";
import ReviewStep from "@/modules/auth/register/components/ReviewStep";

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

const AddStudentOld = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const [formError, setFormError] = useState<string | null>(null);
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isMedium, setIsMedium] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1024
  );

  // Fetch student data if editing
  const { data: studentData, isLoading: isFetching } = useGetStudentByIdQuery(
    id!,
    {
      skip: !isEdit,
    }
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(window.innerWidth < 640);
      setIsMedium(width >= 640 && width < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      title: isMobile || isMedium ? "Personal" : "Personal Information",
      description:
        !isMobile && !isMedium ? "Student's basic details" : undefined,
    },
    {
      title: isMobile || isMedium ? "Contact" : "Contact Information",
      description:
        !isMobile && !isMedium ? "How to reach the student" : undefined,
    },
    {
      title: isMobile || isMedium ? "Academic" : "Academic Information",
      description:
        !isMobile && !isMedium ? "Student's education details" : undefined,
    },
    {
      title: isMobile || isMedium ? "Password" : "Create Password",
      description:
        !isMobile && !isMedium ? "Set up login credentials" : undefined,
    },
    {
      title: "Review",
      description:
        !isMobile && !isMedium ? "Verify all information" : undefined,
    },
  ];

  const validationSchema = [
    Yup.object().shape({
      name: Yup.string().required("Full name is required"),
    }),
    Yup.object().shape({
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Mobile number must contain only digits")
        .min(10, "Mobile number must be at least 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Email must be valid email address")
        .required("Email is required"),
      schoolEmail: Yup.string().email(
        "School email must be valid email address"
      ),
      address: Yup.string().required("Mailing address is required"),
    }),
    Yup.object().shape({
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
    }),
    Yup.object().shape({
      ...(isEdit
        ? {}
        : {
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must include uppercase, lowercase, number and special character"
              )
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password is required"),
          }),
    }),
    Yup.object().shape({
      name: Yup.string().required("Full name is required"),
      mobile: Yup.string()
        .matches(/^[0-9]+$/, "Mobile number must contain only digits")
        .min(10, "Mobile number must be at least 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Email must be valid email address")
        .required("Email is required"),
      address: Yup.string().required("Mailing address is required"),
      schoolName: Yup.string().required("School name is required"),
      enrollmentDate: Yup.string().required("Enrollment date is required"),
      graduationDate: Yup.string().required("Graduation date is required"),
      studyType: Yup.string().required("Study type is required"),
      ...(isEdit
        ? {}
        : {
            password: Yup.string().required("Password is required"),
            confirmPassword: Yup.string().required(
              "Confirm password is required"
            ),
          }),
      status: Yup.number().oneOf([1, 2]).required("Status is required"),
    }),
  ];

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
        enrollmentDate: values.enrollmentDate,
        graduationDate: values.graduationDate,
        studyType: values.studyType,
        role: {
          id: 2,
        },
        status: {
          id: values.status,
        },
        ...(isEdit
          ? {}
          : {
              password: values.password,
            }),
      };

      if (isEdit) {
        await updateStudent({ id, ...studentData }).unwrap();
        message.success("Student updated successfully!");
      } else {
        await createStudent(studentData).unwrap();
        message.success("Student added successfully!");
      }
      navigate("/students");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to save student. Please try again.";
      setFormError(errorMessage);
      message.error(errorMessage);
    }
  };

  const handleNext = async (
    validateForm: any,
    setTouched: any,
    values: AddStudentFormValues
  ) => {
    const currentValidationSchema = validationSchema[currentStep];

    try {
      await currentValidationSchema.validate(values, { abortEarly: false });
      setCurrentStep(currentStep + 1);
    } catch (err) {
      const touchedFields: any = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.path) touchedFields[e.path] = true;
        });
      }
      setTouched(touchedFields);
      await validateForm();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  if (isEdit && isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 min-h-screen overflow-auto">
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
          { title: <a href="/students">Students</a> },
          { title: isEdit ? "Edit Student" : "Add New Student" },
        ]}
        className="py-2 px-1"
      />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Card className="mb-6 shadow-sm border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#F15822]/90 to-[#F15822] p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {isEdit ? "Edit Student" : "Add New Student"}
                </h2>
                <p className="mt-2 text-sm sm:text-base opacity-90">
                  {isEdit
                    ? "Update student information"
                    : "Complete all required information to register a student"}
                </p>
              </div>
              <img
                src="/images/misc/attendify.png"
                alt="Attendify Logo"
                className="mt-4 sm:mt-0 sm:ml-auto h-10 sm:h-12 md:h-16 filter brightness-0 invert"
              />
            </div>
          </div>
        </Card>

        {/* Mobile Progress Indicator */}
        <div className="sm:hidden mb-6">
          <Card className="shadow-sm border-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}:{" "}
                <span className="text-[#F15822]">
                  {steps[currentStep].title}
                </span>
              </span>
              <span className="text-sm font-medium text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <Progress
              percent={((currentStep + 1) / steps.length) * 100}
              showInfo={false}
              strokeColor="#F15822"
              size="small"
            />
          </Card>
        </div>

        {/* Desktop Steps */}
        <Card className="hidden sm:block mb-6 shadow-sm border-0">
          <Steps
            current={currentStep}
            items={steps}
            className="py-2"
            responsive={true}
            size={isMobile || isMedium ? "small" : "default"}
            labelPlacement={isMedium ? "vertical" : "horizontal"}
            progressDot={!isMobile}
          />
        </Card>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0 rounded-md overflow-hidden">
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start">
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
            validationSchema={validationSchema[currentStep]}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleSubmit,
              errors,
              values,
              touched,
              validateForm,
              setTouched,
              setFieldValue,
            }) => (
              <Form className="w-full" autoComplete="off" noValidate>
                <div>
                  {currentStep === 0 && (
                    <PersonalInfoStep
                      //@ts-ignore
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}

                  {currentStep === 1 && (
                    <ContactInfoStep
                      //@ts-ignore
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}

                  {currentStep === 2 && (
                    <AcademicInfoStep
                      //@ts-ignore
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}

                  {currentStep === 3 && !isEdit && (
                    <PasswordStep
                      //@ts-ignore
                      values={values}
                      errors={errors}
                      touched={touched}
                    />
                  )}

                  {currentStep === 4 && (
                    <div>
                      <ReviewStep
                        //@ts-ignore
                        values={values}
                        errors={errors}
                        touched={touched}
                      />
                      <div className="mt-6">
                        <label className="block mb-2 font-medium">Status</label>
                        <Select
                          value={values.status}
                          onChange={(value) => setFieldValue("status", value)}
                          style={{ width: 200 }}
                        >
                          <Select.Option value={1}>Active</Select.Option>
                          <Select.Option value={2}>Inactive</Select.Option>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Navigation */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrevious}
                      size={isMobile ? "middle" : "large"}
                      className="min-w-[120px] flex items-center justify-center"
                    >
                      Previous
                    </Button>
                  )}

                  {currentStep < (isEdit ? 3 : 4) ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        handleNext(validateForm, setTouched, values)
                      }
                      size={isMobile ? "middle" : "large"}
                      className={`bg-[#F15822] hover:!bg-[#e04e00] sm:ml-auto flex items-center justify-center min-w-[120px]`}
                    >
                      Next
                    </Button>
                  ) : !(isCreating || isUpdating) ? (
                    <Button
                      type="primary"
                      onClick={() => handleSubmit()}
                      size={isMobile ? "middle" : "large"}
                      className="bg-[#F15822] hover:!bg-[#e04e00] sm:ml-auto min-w-[120px] flex items-center justify-center"
                    >
                      {isEdit ? "Update Student" : "Add Student"}
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="sm:ml-auto min-w-[120px] flex items-center justify-center"
                    >
                      <Spin size="small" className="mr-2" />
                      Processing...
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>

          {/* Back Link */}
          <div className="text-center mt-8 pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Want to go back?{" "}
              <button
                type="button"
                className="text-[#F15822] hover:underline font-medium transition-colors"
                onClick={() => navigate("/students")}
              >
                View Students List
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddStudentOld;
