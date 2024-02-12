import { Link, useLocation } from "react-router-dom";

type typePage = {
  currentPage: number;
};

function NavPagination({ currentPage }: typePage) {
  const location = useLocation();
  let disabledLinkPage;
  if (location.pathname === "/" || location.pathname === "/page/1") {
    disabledLinkPage = true;
  }

  return (
    <ul className="flex space-x-4 justify-center">
      <li>
        <Link
          className={`linkPagination ${
            disabledLinkPage ? "opacity-50 cursor-not-allowed" : ""
          } `}
          to={`/page/${currentPage - 1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </Link>
      </li>

      <li>
        <Link
          className="flex items-center justify-center shrink-0 hover:bg-gray-50  border-2 border-blue-500 cursor-pointer text-base font-bold text-blue-500 w-10 h-10 rounded-lg"
          to={`/page/${currentPage + 1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </li>
    </ul>
  );
}

export default NavPagination;
