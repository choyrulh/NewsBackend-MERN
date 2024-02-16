import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../hooks/UserProvider";
import { useEffect } from "react";
// import useUserLogin from "../hooks/useUserLogin";

type Props = {
  children: React.ReactNode;
};

export const AdminProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserLogin();
  const role = user?.role;

  useEffect(() => {
    if (role !== "admin") {
      navigate("/login");
    }
  });
  if (role === "admin") {
    return children;
  }
  // Use navigate instead of redirect
  // You can also return a fallback UI or null if needed
};
