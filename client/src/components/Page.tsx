import { Link } from "react-router-dom";

type typePage = {
  onClick: () => void;
};

function Page({ onClick }: typePage) {
  const page: Array<{ page: string }> = [
    { page: "prev" },
    { page: "1" },
    { page: "2" },
    { page: "3" },
    { page: "4" },
    { page: "next" },
  ];
  console.log(page);

  return (
    <ul className="flex space-x-4 justify-center">
      {page.map((item, index) => (
        <li
          className="flex items-center justify-center shrink-0 hover:bg-gray-50  border-2 border-blue-500 cursor-pointer text-base font-bold text-blue-500 w-10 h-10 rounded-lg"
          key={index}
        >
          <Link onClick={onClick} to={item.page}>
            {item.page}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Page;
