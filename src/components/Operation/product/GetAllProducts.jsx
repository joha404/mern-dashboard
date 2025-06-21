import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";

function GetAllProducs({ allProducts, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const viewDetils = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="mt-10 rounded shadow bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 hidden sm:table-header-group">
              <tr>
                <th className="py-3 px-4 text-center font-semibold">Images</th>
                <th className="py-3 px-4 text-center font-semibold">Name</th>
                <th className="py-3 px-4 text-center font-semibold">
                  Old Price
                </th>
                <th className="py-3 px-4 text-center font-semibold">
                  New Price
                </th>
                <th className="py-3 px-4 text-center font-semibold">Stock</th>
                <th className="py-3 px-4 text-center font-semibold">
                  Category
                </th>
                <th className="py-3 px-4 text-center font-semibold">Date</th>
                <th className="py-3 px-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-600">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 border-b sm:table-row grid grid-cols-1 sm:grid-cols-none sm:text-center text-left px-4 py-3 sm:p-0"
                    >
                      <td className="py-2 sm:p-4">
                        <div className="w-20 h-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-10 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
                      </td>
                      <td className="py-2 sm:p-4">
                        <div className="flex justify-center gap-3">
                          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                currentProducts.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-gray-50 border-b sm:table-row grid grid-cols-1 sm:grid-cols-none sm:text-center text-left px-4 py-3 sm:p-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    <td className="py-2 sm:p-4 text-sm sm:text-base h-[100px] w-[100px]">
                      {item.images?.length > 0 && (
                        <img
                          src={
                            typeof item.images[0] === "string"
                              ? item.images[0]
                              : item.images[0]?.url
                          }
                          alt={item.name}
                          className="h-full w-full object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      {item.name}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      ${item.oldPrice}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      ${item.price}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      {item.stock ? "Yes" : "No"}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      {item.category?.name || "N/A"}
                    </td>
                    <td className="py-2 sm:p-4 text-sm sm:text-base">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2 sm:p-4">
                      <div className="flex sm:justify-center gap-4 text-lg">
                        <button
                          onClick={() => viewDetils(item._id)}
                          className="hover:text-blue-500 cursor-pointer"
                        >
                          <FaRegEye />
                        </button>
                        <button
                          onClick={() => onUpdate(item)}
                          className="hover:text-green-500 cursor-pointer"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => onDelete(item._id)}
                          className="hover:text-red-500 cursor-pointer"
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
      {totalPages > 0 && (
        <div className="flex w-full justify-center">
          <div className="flex justify-center w-sm items-center gap-2 p-4 mt-2">
            <PrimaryButton
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              text="Prev"
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            />
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 text-sm border rounded  ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <PrimaryButton
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              text="Next"
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GetAllProducs;
