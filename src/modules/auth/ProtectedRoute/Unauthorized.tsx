import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const authData = localStorage.getItem("auth");
  const auth = authData ? JSON.parse(authData) : null;
  const userRole = auth?.user?.role?.type || "";

  const handleRedirect = () => {
    if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "User") {
      navigate("/student/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-8">
        You don't have permission to access this page.
      </p>
      <Button type="primary" size="large" onClick={handleRedirect}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Unauthorized;
