import { Spin, message, Progress } from "antd";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { useResetPasswordMutation } from "@/appstore/auth/auth_api";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
  otp: string; // Add OTP field
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const { email = "" } = useParams<{ email?: string }>();
  const [formError, setFormError] = useState<string | null>(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if no email in params
  if (!email) {
    message.error("Email is required to reset password");
    return <Navigate to="/auth/forgot-password" replace />;
  }

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let score = 0;

    if (!password) return 0;

    // Length check
    if (password.length >= 8) score += 25;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 25;
    if (/[a-z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    return Math.min(100, score);
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "#ff4d4f";
    if (strength < 60) return "#faad14";
    return "#52c41a";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

  const resetPasswordValidationSchema = Yup.object().shape({
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
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^[0-9]+$/, "OTP must contain only numbers")
      .min(4, "OTP must be at least 4 digits"),
  });

  const resetPasswordHandler = async (values: ResetPasswordFormValues) => {
    setFormError(null);
    try {
      const res: any = await resetPassword({
        email,
        hash: values.otp,
        password: values.password,
      });
      if (res.error) {
        setFormError(
          res.error.data.message || "Password reset failed. Please try again!"
        );
        message.error(
          res.error.data.message || "Password reset failed. Please try again!"
        );
      } else {
        message.success("Password reset successful. Please login.");
        navigate("/auth/login");
      }
    } catch (error: any) {
      setFormError("Something went wrong. Please try again!");
      message.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="p-8 min-h-screen overflow-auto grid place-content-center ">
      <div className="auth_h_screen grid lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px] lg:gap-6 xl:gap-12 shadow-sm rounded-2xl overflow-hidden">
        <div className="hidden lg:flex lg:items-center xl:items-end justify-center bg-[#F8F7FA] rounded-l-2xl pt-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffe1d6] to-[#fff8f5] opacity-70"></div>

          <img
            src="/images/misc/welcome-to-attendify.webp"
            alt="login"
            className="relative z-10 max-w-full"
          />
        </div>

        <div className="flex flex-col h-full items-center justify-center p-5 md:p-12 md:px-[70px] lg:p-12 bg-white rounded-r-2xl">
          <div className="mb-10 text-center">
            <div className="mb-8 flex justify-center lg:hidden">
              <img
                src="/images/misc/attendify.png"
                alt="Attendify Logo"
                className="h-12"
              />
            </div>
            <h4 className="mb-2 text-2xl font-bold text-gray-800">
              Reset Your Password
            </h4>
            <p className="text-gray-600">
              Create a new password for{" "}
              <span className="font-semibold text-[#f75709]">{email}</span>
            </p>
          </div>

          {formError && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
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
            initialValues={{
              password: "",
              confirmPassword: "",
              otp: "", // Initialize OTP field
            }}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={resetPasswordHandler}
          >
            {({ handleSubmit, errors, values, touched, handleChange }) => {
              // Update password strength when password changes
              useEffect(() => {
                setPasswordStrength(checkPasswordStrength(values.password));
              }, [values.password]);

              return (
                <Form className="w-full" autoComplete="off" noValidate>
                  {/* OTP Field */}
                  <div className="form_group col-span-2 mb-6">
                    <label
                      htmlFor="otp"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Enter OTP
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        name="otp"
                        inputMode="numeric"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors?.otp && touched?.otp
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-[#f75709] focus:border-[#f75709]"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all`}
                        placeholder="Enter the OTP sent to your email"
                        value={values?.otp ?? ""}
                      />
                    </div>
                    {errors?.otp && touched?.otp ? (
                      <div className="mt-1 text-sm text-red-600">
                        {errors?.otp}
                      </div>
                    ) : null}
                  </div>

                  <div className="form_group col-span-2 mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      New Password
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={passwordType}
                        name="password"
                        autoComplete="new-password"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors?.password && touched?.password
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-[#f75709] focus:border-[#f75709]"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all pr-11`}
                        placeholder="Enter new password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                        }}
                        value={values?.password ?? ""}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setPasswordType(
                            passwordType === "password" ? "text" : "password"
                          )
                        }
                      >
                        {passwordType === "password" ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>

                    {values.password && (
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: getStrengthColor(passwordStrength),
                            }}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(passwordStrength)}%
                          </span>
                        </div>
                        <Progress
                          percent={passwordStrength}
                          showInfo={false}
                          size="small"
                          strokeColor={getStrengthColor(passwordStrength)}
                        />
                      </div>
                    )}

                    {errors?.password && touched?.password ? (
                      <div className="mt-1 text-sm text-red-600">
                        {errors?.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="form_group col-span-2 mb-8">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Confirm Password
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={confirmPasswordType}
                        name="confirmPassword"
                        autoComplete="new-password"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors?.confirmPassword && touched?.confirmPassword
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-[#f75709] focus:border-[#f75709]"
                        } focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-all pr-11`}
                        placeholder="Confirm new password"
                        value={values?.confirmPassword ?? ""}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setConfirmPasswordType(
                            confirmPasswordType === "password"
                              ? "text"
                              : "password"
                          )
                        }
                      >
                        {confirmPasswordType === "password" ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>
                    {errors?.confirmPassword && touched?.confirmPassword ? (
                      <div className="mt-1 text-sm text-red-600">
                        {errors?.confirmPassword}
                      </div>
                    ) : null}
                  </div>

                  <button
                    onClick={() => handleSubmit()}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 rounded-lg bg-[#f75709] hover:bg-[#e04e00] text-white font-medium transition-colors flex items-center justify-center
                      ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
                    `}
                  >
                    {isLoading ? (
                      <>
                        <Spin size="small" className="mr-2" />
                        <span>Resetting Password...</span>
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>

                  <div className="text-center mt-6 text-gray-600">
                    <p>
                      Remember your password?{" "}
                      <button
                        type="button"
                        className="text-[#f75709] font-medium hover:underline transition-colors"
                        onClick={() => navigate("/auth/login")}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
