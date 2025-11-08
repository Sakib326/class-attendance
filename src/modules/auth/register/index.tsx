import { Button, Steps, Spin, message } from "antd";
import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useRegisterMutation } from "@/appstore/auth/auth_api";
import PasswordStep from "./components/PasswordStep";
import AcademicInfoStep from "./components/AcademicInfoStep";
import ContactInfoStep from "./components/ContactInfoStep";
import PersonalInfoStep from "./components/PersonalInfoStep";
import ReviewStep from "./components/ReviewStep";

interface RegisterFormValues {
  name: string;
  mobile: string;
  email: string;
  schoolEmail: string;
  address: string;
  schoolName: string;
  enrollmentDate: string;
  graduationDate: string;
  studyType: string;

  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [register, { isLoading }] = useRegisterMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isMedium, setIsMedium] = useState(
    window.innerWidth >= 640 && window.innerWidth < 1024
  );

  // Handle responsive behavior
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
      description: !isMobile && !isMedium ? "Your basic details" : undefined,
    },
    {
      title: isMobile || isMedium ? "Contact" : "Contact Information",
      description: !isMobile && !isMedium ? "How to reach you" : undefined,
    },
    {
      title: isMobile || isMedium ? "Academic" : "Academic Information",
      description:
        !isMobile && !isMedium ? "Your education details" : undefined,
    },
    {
      title: isMobile || isMedium ? "Password" : "Create Password",
      description: !isMobile && !isMedium ? "Set up your login" : undefined,
    },
    {
      title: "Review",
      description: !isMobile && !isMedium ? "Verify information" : undefined,
    },
  ];

  const registerValidationSchema = [
    // Step 1: Personal Information
    Yup.object().shape({
      name: Yup.string().required("Full name is required"),
    }),

    // Step 2: Contact Information
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
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm password is required"),
    }),
  ];

  const registerHandler = async (values: RegisterFormValues) => {
    setFormError(null);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        schoolEmail: values.schoolEmail,
        address: values.address,
        schoolName: values.schoolName,
        enrollmentDate: values.enrollmentDate,
        graduationDate: values.graduationDate,
        studyType: values.studyType,
      }).unwrap();

      sessionStorage.setItem("registrationData", JSON.stringify({ ...values }));

      message.success("Registration successful!");

      navigate(`/auth/email-confirm?email=${encodeURIComponent(values.email)}`);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Registration failed. Please try again!";
      setFormError(errorMessage);
      message.error(errorMessage);
    }
  };

  const handleNext = async (
    validateForm: any,
    setTouched: any,
    values: RegisterFormValues
  ) => {
    const currentValidationSchema = registerValidationSchema[currentStep];

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

  const initialValues: RegisterFormValues = {
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
  };

  return (
    <div className="p-3 sm:p-8 min-h-screen overflow-auto">
      <div className="auth_h_screen max-w-7xl mx-auto">
        <div className="flex flex-col h-full items-center justify-center p-3 sm:p-5 md:p-12 lg:p-12">
          <div className="mb-6 sm:mb-10 text-center w-full">
            <div className="mb-4 sm:mb-8 flex justify-center h-12">
              <img src="/images/misc/attendify.png" alt="Attendify Logo" />
            </div>
            <h4 className="text-lg sm:text-xl mb-1 sm:mb-2">
              Welcome to Attendify Portal
            </h4>
            <p className="text-sm sm:text-base">Create your account</p>
          </div>

          {/* Mobile Stepper (for xs screens) */}
          <div className="w-full mb-6 sm:hidden">
            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
              <div className="text-sm font-medium text-gray-700 ">
                Step {currentStep + 1}/{steps.length}
              </div>
              <div className="text-sm font-medium text-primary">
                {steps[currentStep].title}
              </div>
            </div>
          </div>

          {/* Desktop Stepper */}
          <Steps
            current={currentStep}
            items={steps}
            className="w-full  mb-6 sm:mb-10 hidden sm:block "
            responsive={true}
            size={isMobile || isMedium ? "small" : "default"}
            labelPlacement={isMedium ? "vertical" : "horizontal"}
          />

          {formError && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {formError}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema[currentStep]}
            onSubmit={registerHandler}
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
            }) => (
              <Form className="w-full max-w-4xl" autoComplete="off" noValidate>
                {currentStep === 0 && (
                  <PersonalInfoStep
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                )}

                {currentStep === 1 && (
                  <ContactInfoStep
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                )}

                {currentStep === 2 && (
                  <AcademicInfoStep
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                )}

                {currentStep === 3 && (
                  <PasswordStep
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                )}

                {currentStep === 4 && (
                  <ReviewStep
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                )}

                <div className="flex justify-between mt-6 sm:mt-8">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrevious}
                      size={isMobile ? "middle" : "large"}
                      className="min-w-[100px]"
                    >
                      Previous
                    </Button>
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        handleNext(validateForm, setTouched, values)
                      }
                      size={isMobile ? "middle" : "large"}
                      className={`ml-auto bg-[#F15822] hover:!bg-[#e04e00] min-w-[100px] ${
                        currentStep === 0 && !isMobile ? "ml-auto" : ""
                      }`}
                    >
                      Next
                    </Button>
                  ) : !isLoading ? (
                    <Button
                      type="primary"
                      onClick={() => handleSubmit()}
                      size={isMobile ? "middle" : "large"}
                      className="ml-auto bg-[#f75709] hover:!bg-[#e04e00] min-w-[100px]"
                    >
                      Register
                    </Button>
                  ) : (
                    <Button disabled className="ml-auto min-w-[100px]">
                      <Spin size="small" />
                    </Button>
                  )}
                </div>

                <div className="text-center mt-6 sm:mt-8 text-sm sm:text-base">
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline font-medium"
                      onClick={() => navigate("/auth/login")}
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
