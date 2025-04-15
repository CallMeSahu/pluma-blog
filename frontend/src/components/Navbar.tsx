import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const name = localStorage.getItem("name");
  return (
    <nav className="flex justify-between items-center px-6 md:px-20 xl:px-[300px] py-4 border-b border-gray-200 shadow-sm bg-white">
      <div>
        <h1 className="text-3xl font-semibold cursor-pointer tracking-tight">Pluma.</h1>
      </div>
      <div className="flex justify-end items-center gap-4">
        {
          location.pathname !== "/create" &&
          <Link to="/create" >
            <button  className="px-5 py-2 text-white bg-zinc-900 rounded-full cursor-pointer">Create</button>
          </Link>
        }
        <div className="w-10 h-10 flex justify-center items-center bg-blue-200 rounded-full cursor-pointer">
          <span className="text-blue-900 font-semibold">
            {(name ?? "").split(" ").map(word => word[0]).join('').toUpperCase()}
          </span>
        </div>
      </div>
    </nav>
  );
};
