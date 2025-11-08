import { Checkbox, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSignInMutation } from "@/appstore/auth/auth_api";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: {
      type: string;
      name: string;
      id: string;
    };
    permissions?: string[];
  };
}

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [signIn, { isLoading }] = useSignInMutation();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const auth = JSON.parse(authData);
        if (auth && auth.token && auth.expirationTime > new Date().getTime()) {
          const userRole = auth.user?.role?.name;
          navigateByRole(userRole || "User");
        }
      } catch (e) {
        localStorage.removeItem("auth");
      }
    }

    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setRememberMe(true);
    }
  }, []);

  const navigateByRole = (role: string) => {
    const normalizedRole = role.toUpperCase();

    if (normalizedRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (normalizedRole === "USER") {
      navigate("/student/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const signinHandler = async (values: LoginFormValues) => {
    setFormError(null);

    try {
      const res: { data?: AuthResponse; error?: any } = await signIn({
        email: values.email,
        password: values.password,
      });

      if (res.error) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setFormError(
          res.error.data?.message || "Login failed. Please try again."
        );
      } else if (res.data) {
        setLoginAttempts(0);

        const userRole = res.data.user.role?.name?.toUpperCase() || "USER";

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", values.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        const authData = {
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          user: {
            id: String(res.data.user.id),
            name: res.data.user.name || "User",
            email: res.data.user.email,
            role: {
              type: userRole,
              name: res.data.user.role?.name || "User",
              id: String(res.data.user.role?.id) || "",
            },
            permissions: res.data.user.permissions || [],
          },
          expirationTime: new Date().getTime() + 24 * 60 * 60 * 1000,
          loginTimestamp: new Date().toISOString(),
        };

        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(authData));

        message.success(`Welcome back!`);
        navigateByRole(userRole);
      }
    } catch (error: any) {
      setFormError("Something went wrong. Please try again!");
      message.error("Something went wrong. Please try again!");
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="p-8 min-h-screen overflow-auto grid place-content-center">
      <div className="auth_h_screen grid lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px] lg:gap-6 xl:gap-12">
        <div className="hidden lg:flex lg:items-center xl:items-end justify-center bg-[#F8F7FA] rounded-2xl pt-10">
          <img src="/images/misc/welcome-to-attendify.webp" alt="login" />
        </div>

        <div className="flex flex-col h-full items-center justify-center p-5 md:p-12 md:px-[70px] lg:p-12">
          <div className="mb-10 text-center">
            <div className="mb-8 flex justify-center">
              <img
                src="/images/misc/attendify.png"
                alt="Attendify Logo"
                className="h-12"
              />
            </div>
            <h4 className="mb-2">Welcome to Attendify</h4>
            <p>Sign in to your account</p>
          </div>

          {formError && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {formError}
            </div>
          )}
          <Formik
            initialValues={{
              email: localStorage.getItem("rememberedEmail") || "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              signinHandler({
                ...values,
                rememberMe,
              });
            }}
          >
            {({ handleSubmit, errors, values, touched }) => (
              <Form className="w-full" autoComplete="off" noValidate>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
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
                      placeholder="Email"
                      value={values?.email ?? ""}
                    />
                    {errors?.email && touched?.email ? (
                      <div className="error">{errors?.email}</div>
                    ) : null}
                  </div>

                  <div className="form_group col-span-2 relative">
                    <label htmlFor="password">
                      Password <span className="astrisk">*</span>
                    </label>

                    <div className="relative">
                      <Field
                        type={`${type}`}
                        name="password"
                        autoComplete="current-password"
                        className={`${
                          errors?.password && touched?.password ? "error" : ""
                        } !pr-11`}
                        placeholder="Password"
                        value={values?.password ?? ""}
                      />
                      <div
                        className="password_view"
                        onClick={() =>
                          setType(type == "password" ? "text" : "password")
                        }
                      >
                        {type === "password" ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>
                    {errors?.password && touched?.password ? (
                      <div className="error">{errors?.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Remember me</span>
                </div>

                {!isLoading ? (
                  <button
                    onClick={() => handleSubmit}
                    type="submit"
                    className="w-full mt-5 mb-4 py-3.5 rounded-lg bg-[#f75709] hover:bg-[#e04e00] text-white font-medium transition-colors"
                  >
                    Sign In
                  </button>
                ) : (
                  <button className="btn btn-primary w-full mt-5 mb-4 py-3 rounded-lg disabled">
                    <Spin />
                  </button>
                )}

                <div className="text-right mb-4">
                  <button
                    type="button"
                    className="text-primary hover:underline text-sm"
                    onClick={() => navigate("/auth/forgot-password")}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => navigate("/auth/register")}
                    >
                      Register
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

export default Login;
