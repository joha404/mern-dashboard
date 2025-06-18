import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { NavItem } from "../../componentss/common/NavItem.jsx";
import Breadcrumb from "../../shared/Breadcrumb.jsx";
import { TbCategory2 } from "react-icons/tb";
import { TbBrandBinance } from "react-icons/tb";
import { SiCmake } from "react-icons/si";
export default function Operation() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <div className={"max-w-[90%] mx-auto"}>
        <div className="mb-6">
          <Breadcrumb
            pageName={"Home Page Content"}
            text={"Manage Home Page Content"}
          />
        </div>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row bg-white text-gray-800 rounded-xl overflow-hidden  border border-gray-200">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 py-8 px-6 bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-lg">
            <span className={"text-gray-400 font-thin text-xs uppercase"}>
              General
            </span>
            <nav className="space-y-1 mt-3">
              <NavItem to="category" label="Category" icon={<TbCategory2 />} />
              <NavItem to="brand" label="Brand" icon={<TbBrandBinance />} />
              <NavItem to="make" label="Make" icon={<SiCmake />} />
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 py-3 md:py-8 bg-white relative">
            {/* Content container */}
            <motion.div
              className="h-full overflow-auto w-full px-1.5 md:px-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </motion.section>
  );
}
