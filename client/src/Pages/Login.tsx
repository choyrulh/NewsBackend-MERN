import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../service/userApi";

type formUserLogin = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const inputRef = useRef<formUserLogin>({
    email: "",
    password: "",
  });

  const { mutateAsync } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: formUserLogin) => {
      navigate("/");
      console.log("submits sukses" + data);
    },
  });

  const handleChange =
    (field: keyof formUserLogin) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      inputRef.current = { ...inputRef.current, [field]: e.target.value };
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateAsync(inputRef.current);
  };

  return (
    <>
      <div className="min-h-screen flex flex-row items-center justify-center">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome Back
            </h3>

            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Login account
            </p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <InputForm
                onChange={handleChange("email")}
                type="email"
                placeholder="Email"
                ariaLabel="Email"
              />
              <InputForm
                onChange={handleChange("password")}
                type="password"
                placeholder="Password"
                ariaLabel="password"
              />

              <div className="flex items-center justify-between mt-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                >
                  Forget Password?
                </a>

                <Button type="submit">Login</Button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">
              Don't have an account?{" "}
            </span>

            <Link
              to="/register"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
