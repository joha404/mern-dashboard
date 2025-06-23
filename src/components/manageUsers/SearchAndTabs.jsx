// Updated components preserving your original styles

// ✅ SearchAndTabs.jsx
import { FiSearch } from "react-icons/fi";
import PrimaryButton from "../common/PrimaryButton";
export default function SearchAndTabs({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  userPerPage,
  setUserPerPage,
}) {
  const tabs = ["All", "Active", "Inactive"];
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between sm:justify-between md:justify-between lg:justify-between gap-4 mb-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <div className="relative">
          <span className="absolute left-3 top-5 -translate-y-1/2 text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <PrimaryButton type="submit">Search</PrimaryButton>
      </form>

      <div className="w-full max-w-sm ">
        <div className="flex gap-x-6 border-b border-gray-300 relative">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
          <select
            value={userPerPage}
            onChange={(e) => {
              setUserPerPage(Number(e.target.value));
            }}
            className="text-sm font-semibold text-gray-700 px-4 py-2 bg-transparent mb-2 focus:outline-none transition-all duration-200 ease-in-out cursor-pointer"
          >
            <option value="5">5 per page</option>
            <option value="8">8 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
