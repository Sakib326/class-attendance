import PrivateLayout from "@/modules/@common/@layout/private";
import UserLayout from "@/modules/@common/@layout/private/userLayout";
import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

type ProtectedRouteContext = {
  userRole: string;
};

interface User {
  id: string;
  name: string;
  email: string;
  role?: {
    type: string;
    name: string;
    id: string;
  };
}

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
  // const [user, setUser] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const authData = localStorage.getItem("auth");

  //   if (!authData) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const { token, user, expirationTime } = JSON.parse(authData);

  //     if (token && expirationTime > new Date().getTime()) {
  //       setUser(user);
  //     } else {
  //       localStorage.removeItem("auth");
  //     }
  //   } catch (error) {
  //     console.error("Auth error:", error);
  //     localStorage.removeItem("auth");
  //   }

  //   setIsLoading(false);
  // }, []);

  // if (isLoading) return <div>Loading...</div>;
  // if (!user) return <Navigate to="/login" replace />;

  // const userRole = user.role?.name || "";
  // const hasAccess =
  //   allowedRoles.length === 0 || allowedRoles.includes(userRole);

  // if (!hasAccess) return <Navigate to="/unauthorized" replace />;

  const Layout = PrivateLayout;

  return <Layout />;
};

export const useProtectedRoute = () =>
  useOutletContext<ProtectedRouteContext>();
export default ProtectedRoute;
