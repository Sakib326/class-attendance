import { Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "@/appstore/auth/auth_api";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid email address")
      .required("Email is required"),
  });

  const forgotPasswordHandler = async (values: ForgotPasswordFormValues) => {
    setFormError(null);
    try {
      const res: any = await forgotPassword({
        email: values.email,
      });
      if (res.error) {
        setFormError(
          res.error.data.message || "Password reset failed. Please try again!"
        );
        message.error(
          res.error.data.message || "Password reset failed. Please try again!"
        );
      } else {
        message.success("Password reset link sent to your email.");
        navigate(`/reset-password/${values.email}`);
      }
    } catch (error: any) {
      setFormError("Something went wrong. Please try again!");
      message.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="p-8 min-h-screen overflow-auto grid place-content-center">
      <div className="auth_h_screen grid lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px] lg:gap-6 xl:gap-12">
        <div className="hidden lg:flex lg:items-center xl:items-end justify-center bg-[#F8F7FA] rounded-2xl pt-10">
          <img src="/images/misc/welcome-to-attendify.webp" alt="login" />
        </div>

        <div className="flex flex-col h-full items-center justify-center p-5 md:p-12 md:px-[70px] lg:p-12">
          <div className="mb-10 text-center">
            <div className="mb-8 flex justify-center">
              <img src="/images/misc/attendify.png" alt="Attendify Logo" />
            </div>
            <h4 className="mb-2">Reset Your Password</h4>
            <p>Enter your email to reset your password</p>
          </div>

          {formError && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {formError}
            </div>
          )}

          <Formik
            initialValues={{
              email: localStorage.getItem("rememberedEmail") || "",
            }}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={forgotPasswordHandler}
          >
            {({ handleSubmit, errors, values, touched }) => (
              <Form className="w-full" autoComplete="off" noValidate>
                <div className="form_group col-span-2">
                  <label htmlFor="email">
                    Email
                    <span className="astrisk">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={errors?.email && touched?.email ? "error" : ""}
                    placeholder="Enter your email"
                    value={values?.email ?? ""}
                  />
                  {errors?.email && touched?.email ? (
                    <div className="error">{errors?.email}</div>
                  ) : null}
                </div>

                {!isLoading ? (
                  <button
                    onClick={() => handleSubmit}
                    type="submit"
                    className="w-full mt-5 mb-4 py-3.5 rounded-lg bg-[#f75709] hover:bg-[#e04e00] text-white font-medium transition-colors"
                  >
                    Reset Password
                  </button>
                ) : (
                  <button className="btn btn-primary w-full mt-5 mb-4 py-3 rounded-lg disabled">
                    <Spin />
                  </button>
                )}

                <div className="text-center mt-4">
                  <p>
                    Remember your password?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
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

export default ForgotPassword;
