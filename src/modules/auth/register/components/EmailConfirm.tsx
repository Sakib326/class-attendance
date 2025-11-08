import { Button, Input, Spin, message } from "antd";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/appstore/auth/auth_api";

const EmailConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  6;
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const params = new URLSearchParams(location.search);
  const initialEmailValue = params.get("email") || "";

  const extractErrorMessage = (error: any): string => {
    const errorData = error?.data;

    if (errorData?.errors && typeof errorData.errors === "object") {
      const fieldErrors = Object.values(errorData.errors);
      if (fieldErrors.length > 0) {
        return fieldErrors.join(", ");
      }
    }

    return errorData?.message || "An error occurred. Please try again.";
  };

  const handleSendOtp = async (emailAddress: string) => {
    if (!emailAddress) {
      message.error("Please enter a valid email address");
      return;
    }

    setFormError(null);
    try {
      await sendOtp({ email: emailAddress }).unwrap();
      message.success(
        "OTP sent to your email address. Please check your inbox."
      );
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setFormError(errorMessage);
      message.error(errorMessage);
    }
  };

  const handleVerifyOtp = async (values: { email: string; hash: string }) => {
    setFormError(null);
    try {
      await verifyOtp({
        email: values.email,
        hash: values.hash,
      }).unwrap();

      message.success("Verification successful!");
      navigate("/auth/login");
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setFormError(errorMessage);
      message.error(errorMessage);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    hash: Yup.string()
      .required("OTP is required")
      .matches(/^[0-9]+$/, "OTP must contain only digits")
      .length(5, "OTP must be 5 digits"),
  });

  return (
    <div className="p-3 sm:p-8 min-h-screen overflow-auto">
      <div className="auth_h_screen max-w-7xl mx-auto">
        <div className="flex flex-col h-full items-center justify-center p-3 sm:p-5 md:p-12 lg:p-12">
          <div className="mb-6 sm:mb-10 text-center w-full">
            <div className="mb-4 sm:mb-8 flex justify-center">
              <img
                src="/images/misc/attendify.png"
                alt="Attendify Logo"
                className="max-w-[200px] sm:max-w-none"
              />
            </div>
            <h4 className="text-lg sm:text-xl mb-1 sm:mb-2">
              Email Verification
            </h4>
            <p className="text-sm sm:text-base">
              Enter the 5-digit OTP sent to your email
            </p>
          </div>

          {formError && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {formError}
            </div>
          )}

          <Formik
            initialValues={{ email: initialEmailValue, hash: "" }}
            validationSchema={validationSchema}
            onSubmit={handleVerifyOtp}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <Form className="w-full max-w-md" autoComplete="off" noValidate>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-gray-50"
                    readOnly={true}
                    disabled={true}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Enter OTP
                  </label>
                  <Input
                    name="hash"
                    placeholder="Enter 5-digit OTP"
                    value={values.hash}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                    maxLength={5}
                  />
                  {touched.hash && errors.hash && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.hash}
                    </div>
                  )}
                </div>

                <Button
                  type="primary"
                  onClick={() => handleSubmit()}
                  size="large"
                  className="w-full bg-[#f75709] hover:!bg-[#e04e00]"
                  disabled={isSendingOtp || isVerifyingOtp}
                >
                  {isVerifyingOtp ? <Spin size="small" /> : "Verify OTP"}
                </Button>

                <div className="flex justify-between mt-4 text-sm">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => handleSendOtp(values.email)}
                    disabled={isSendingOtp || isVerifyingOtp}
                  >
                    {isSendingOtp ? "Sending..." : "Resend OTP"}
                  </button>

                  <button
                    type="button"
                    className="text-gray-600 hover:underline"
                    onClick={() => navigate("/auth/login")}
                  >
                    Back to Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
