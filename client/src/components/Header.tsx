import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserLogin } from "../hooks/UserProvider";
import useUsersLogout from "../hooks/useUsersLogout";

interface navbar {
  title: string;
  link: string;
}

const Header = () => {
  const { user } = useUserLogin();
  const { handleLogout } = useUsersLogout();

  const location = useLocation();
  const [isMenuCollapsed, setMenuCollapsed] = useState<boolean>(false);

  const role = user?.role;
  console.log(role);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleClick = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };
  const navLinks: navbar[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    {
      title: "News",
      link: "/news",
    },
    {
      title: "Author",
      link: "/author",
    },
  ];
  return (
    <header className="shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] relative">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <a
          href="/"
          className="lg:absolute max-lg:top-4 max-lg:left-10 max-sm:left-4 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-36"
          />
        </a>
        <div className="flex items-center ml-auto lg:order-1">
          {role === "user" && (
            <>
              <button className="mr-6 font-semibold text-[15px] border-none outline-none">
                <Link to="/profile" className="text-[#007bff] hover:underline">
                  Profile
                </Link>
              </button>
              <button
                onClick={handleLogout}
                className="mr-6 font-semibold text-[15px] border-none outline-none"
              >
                <Link to="/login" className="text-[#007bff] hover:underline">
                  Logout
                </Link>
              </button>
            </>
          )}
          {role === undefined && (
            <>
              <button className="mr-6 font-semibold text-[15px] border-none outline-none">
                <Link to="/login" className="text-[#007bff] hover:underline">
                  Login
                </Link>
              </button>
              <button className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                <Link to="/register">Register</Link>
              </button>
            </>
          )}
          {role === "admin" && (
            <>
              <button className="mr-6 font-semibold text-[15px] border-none outline-none">
                <Link
                  to="/dashboard"
                  className="text-[#007bff] hover:underline"
                >
                  Dashboard
                </Link>
              </button>
              <button
                onClick={handleLogout}
                className="mr-6 font-semibold text-[15px] border-none outline-none"
              >
                <Link to="/login" className="text-[#007bff] hover:underline">
                  Logout
                </Link>
              </button>
            </>
          )}
          <button id="toggle" className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#333"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <ul
          onClick={handleClick}
          id="collapseMenu"
          style={{ display: isMenuCollapsed ? "block" : "hidden" }}
          className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          {navLinks.map((i: navbar) => (
            <NavLink
              to={i.link}
              key={i.title}
              className={({ isActive }) =>
                isActive ? "text-[#007bff] navText" : "navText"
              }
              end
            >
              {i.title}
            </NavLink>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
