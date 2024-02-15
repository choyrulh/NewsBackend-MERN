import { useNavigate } from "react-router-dom";
import useUserLogin from "../hooks/useUserLogin";

type Props = {
  children: React.ReactNode;
};

export const AdminProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserLogin();
  const role = user?.role;

  if (role === "admin") {
    return children;
  } else {
    // Use navigate instead of redirect
    navigate("/login");
    // You can also return a fallback UI or null if needed
    return null;
  }
};
