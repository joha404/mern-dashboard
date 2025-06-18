import { IoNotificationsOutline } from "react-icons/io5";
import img from "@/assets/images/profile_image.png";
import { useState } from "react";
import { Modal } from "antd";
import { MdDashboard } from "react-icons/md";
const Header = ({ isSidebarOpen, handleSidebar }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <header className="w-full flex sticky lg:p-6 p-2  bg-text-white top-0 z-10">
      <div className="w-full flex lg:gap-5 gap-3">
        <button className="2xl:hidden block " onClick={handleSidebar}>
          <MdDashboard size={40} className="text-[#3EC65D]" />
        </button>
        <div className="w-full hidden sm:block">
          <h1 className="text-[#161C24] md:text-2xl text-xl font-semibold">
            Dashboard
          </h1>
          <p className="text-[#919EAB] md:text-lg text-base text-nowrap">
            Here is your performants rate😊
          </p>
        </div>
      </div>
      <div className="w-full flex sm:gap-5 gap-3 justify-end items-center">
        <IoNotificationsOutline className="text-2xl" />
        <div
          onClick={() => setIsSignIn(true)}
          className="sm:w-12 w-10 sm:h-12 h-10 cursor-pointer overflow-hidden rounded-full"
        >
          <img
            className="w-full h-full object-contain"
            src={img}
            alt="profileImage"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
