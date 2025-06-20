import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

function GetAllCategory({ allCategories, onUpdate, onDelete }) {
  const loading = false;
  return (
    <div className="overflow-x-auto mt-10 rounded shadow bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
          <tr>
            <th className="py-3 px-4 text-center font-semibold">Images</th>
            <th className="py-3 px-4 text-center font-semibold">Title</th>
            <th className="py-3 px-4 text-center font-semibold">Description</th>
            <th className="py-3 px-4 text-center font-semibold">Date</th>
            <th className="py-3 px-4 text-center font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-600">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <tr key={i} className="border-b animate-pulse">
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="p-2 sm:p-4">
                      <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                    </td>
                  ))}
                </tr>
              ))
          ) : allCategories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            allCategories.map((item, index) => (
              <motion.tr
                key={index}
                className="hover:bg-gray-50 border-b sm:table-row grid grid-cols-1 sm:grid-cols-none sm:text-center text-left px-4 py-3 sm:p-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <td className="py-2 sm:p-4 text-sm sm:text-base h-[100px] w-[100px] ">
                  <span className="block font-semibold sm:hidden">Image:</span>
                  <img src={item.image} alt="" className="h-full w-full" />
                </td>
                <td className="py-2 sm:p-4 text-sm sm:text-base">
                  <span className="block font-semibold sm:hidden">Title:</span>
                  {item.name}
                </td>
                <td className="py-2 sm:p-4 text-sm sm:text-base">
                  <span className="block font-semibold sm:hidden">
                    Description:
                  </span>
                  {item.description}
                </td>
                <td className="py-2 sm:p-4 text-sm sm:text-base">
                  <span className="block font-semibold sm:hidden">Date:</span>
                  7262
                </td>
                <td className="py-2 sm:p-4">
                  <div className="flex sm:justify-center gap-4 text-lg">
                    <button
                      onClick={() => onUpdate(item)}
                      className="hover:text-green-500 cursor-pointer"
                      aria-label="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="hover:text-red-500 cursor-pointer"
                      aria-label="Delete"
                    >
                      <GoTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllCategory;
