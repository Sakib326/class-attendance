import { Spin } from "antd";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/modules/auth/ProtectedRoute";
import Unauthorized from "@/modules/auth/ProtectedRoute/Unauthorized";
import { AuthProvider } from "@/modules/auth/contexts/AuthContext";
import ForgotPassword from "@/modules/auth/forgot-password";
import Register from "@/modules/auth/register";
import Addnewstudent from "@/modules/student/add/new";

import EmailConfirm from "@/modules/auth/register/components/EmailConfirm";
import UpdateProfile from "@/modules/profile/updateProfile";
import UpdatePassword from "@/modules/profile/updatePassword";
import ResetPassword from "@/modules/auth/reset-password";
// Lazy loaded pages
const Dashboard = lazy(() => import("@/modules/dashboard"));
const StudentList = lazy(() => import("@/modules/student/list"));
const Login = lazy(() => import("@/modules/auth/login"));

const AppRouter = () => {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="grid place-content-center h-screen w-screen">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/email-confirm" element={<EmailConfirm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Students */}
            <Route path="/students/list" element={<StudentList />} />
            <Route path="/student/add" element={<Addnewstudent />} />
            <Route path="/student/edit/:id" element={<Addnewstudent />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["User", "Admin"]} />}>
            {/* <Route path="/exam/dashbord" element={<ExamDashboard />} /> */}

            <Route path="/settings/profile" element={<UpdateProfile />} />
            <Route path="/settings/password" element={<UpdatePassword />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRouter;
