import { motion } from "framer-motion";
import { FiEye, FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

function GetAllCategory({ allCategories, loading, onDelete, onUpdate }) {
  return (
    <div className="overflow-auto bg-white rounded shadow mt-10">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Image
              </th>
              <th className="py-3 px-2 sm:px-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Name
              </th>
              <th className="py-3 px-2 sm:px-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Title
              </th>
              <th className="py-3 px-2 sm:px-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Sub Title
              </th>
              <th className="py-3 px-2 sm:px-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Date
              </th>
              <th className="py-3 px-2 sm:px-4 w-[110px] font-semibold text-gray-700 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="border-b animate-pulse">
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="p-2 sm:p-4">
                        <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
                      </td>
                    ))}
                  </tr>
                ))
            ) : allCategories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              allCategories.map((item, index) => (
                <motion.tr
                  key={item._id}
                  className="hover:bg-gray-100 border-b text-center transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  <td className="p-2 sm:p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 sm:w-16 h-12 sm:h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-2 sm:p-4 text-gray-600 text-sm sm:text-base">
                    {item.name}
                  </td>
                  <td className="p-2 sm:p-4 text-gray-600 text-sm sm:text-base">
                    {item.title}
                  </td>
                  <td className="p-2 sm:p-4 text-gray-600 text-sm sm:text-base">
                    {item.subTitle}
                  </td>
                  <td className="p-2 sm:p-4 text-gray-600 text-sm sm:text-base">
                    {new Date(item?.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex justify-center space-x-2 sm:space-x-4 text-lg sm:text-xl">
                      <button
                        onClick={() => onUpdate(item)}
                        className="hover:text-success"
                        aria-label="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="hover:text-error"
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
    </div>
  );
}

export default GetAllCategory;
