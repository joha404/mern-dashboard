import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Modal } from "antd";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMessage2Line, RiLineChartLine } from "react-icons/ri";
import { IoMdCall } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import logo from "@/assets/images/logo.png";

const SideBar = ({ isSidebarOpen, handleSidebar, closeSidebar, ref }) => {
  const [isHelp, setIsHelp] = useState(false);
  const sidebarItems = [
    { id: 1, path: "/", icon: <MdOutlineDashboard />, element: "Dashboard" },
    {
      id: 2,
      path: "/products",
      icon: <RiMessage2Line />,
      element: "Products",
    },
    {
      id: 5,
      path: "/category",
      icon: <MdLeaderboard />,
      element: "Category",
    },
    {
      id: 3,
      path: "/manag-users",
      icon: <RiLineChartLine />,
      element: "Menage Users",
    },
    { id: 4, path: "/orders", icon: <IoMdCall />, element: "Orders" },
  ];
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`sm:w-[350px] w-full shrink-0 h-full bg-dark text-white sm:p-6 p-3 flex flex-col gap-6 fixed 2xl:relative z-50 top-0 left-0 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          2xl:translate-x-0`}
        ref={ref}
      >
        {/* Close Button for Small Screens */}
        <button
          className="absolute top-4 right-4 2xl:hidden text-white text-3xl"
          onClick={handleSidebar}
        >
          <IoMdClose />
        </button>

        {/* Logo */}
        <Link
          onClick={closeSidebar}
          to="/"
          className="sm:w-[172px] w-[140px] h-[96px] mb-3"
        >
          <img
            className=" object-contain w-[50px] h-[50px]"
            src={logo}
            alt="logo"
          />
        </Link>

        {/* Sidebar Links */}
        <div className="flex flex-col sm:gap-5 gap-1 h-full overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              onClick={closeSidebar}
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center sm:gap-6 gap-4 text-3xl pl-3 py-2 rounded-lg ${
                  isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              <p className="text-lg">{item.element}</p>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
