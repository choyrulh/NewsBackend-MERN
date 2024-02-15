import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import RootLayout from "./Pages/RootLayout";
import About from "./Pages/About";
import News from "./Pages/News";
import Contact from "./Pages/Contact";
import DetailNews from "./Pages/DetailNews";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Author from "./Pages/Author.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import { UserProvider } from "./hooks/UserProvider.tsx";
import { AdminProtectedRoute } from "./utils/AdminProtectedRoute.ts";
function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/dashboard",
          element: (
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          ),
        },
        { path: "/page/:id", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/news", element: <News /> },
        { path: "/news/:id", element: <DetailNews /> },
        { path: "/author", element: <Author /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
