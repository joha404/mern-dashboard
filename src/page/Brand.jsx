import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "../../componentss/common/PrimaryButton";
import GetAllBrands from "../../componentss/CMS/Operation/brand/GetAllBrands";
import { deleteSingleBrand, FetchAllBrands } from "../../api/operations/brand";
import AddNewBrandPage from "../../componentss/CMS/Operation/brand/AddBrand";
import { BiSolidError } from "react-icons/bi";
import UpdateBrand from "../../componentss/CMS/Operation/brand/UpdateBrand";

const Brand = () => {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addBrand, setaddBrand] = useState(false);
  const [showSuccessModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBrand = async () => {
    try {
      const response = await FetchAllBrands();
      setBrand(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch category:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleUpdate = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addBrandModalOpen = () => {
    setaddBrand(true);
  };
  const addHotPickModalClose = () => {
    setaddBrand(false);
  };

  const deleteBrand = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const editingModalClose = () => {
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      setIsLoading(true);
      const response = await deleteSingleBrand(selectedId);
      fetchBrand();
      setShowDeleteModal(false);
      setSelectedId(null);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to delete brand", error);
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      {/* Top Search & Add Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-3 top-3 -translate-y-1/2 text-gray-400"
            >
              <FiSearch />
            </motion.span>
            <input
              type="text"
              placeholder="Search by title"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <PrimaryButton
            customWidth="[200px]"
            isSubmitting={isLoading}
            text={"Search"}
            onClik={handleSearch}
          />
        </form>

        <div className="w-full max-w-sm">
          <div className="flex  mr-4 justify-end border-gray-300">
            <PrimaryButton
              customWidth="[200px]"
              isSubmitting={isLoading}
              text={"Add New"}
              onClik={addBrandModalOpen}
            />
          </div>
        </div>
      </div>
      <GetAllBrands
        loading={loading}
        onDelete={deleteBrand}
        onUpdate={handleUpdate}
        allBrands={brand.filter((item) =>
          item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )}
      />

      <AnimatePresence>
        {addBrand && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex backdrop-blur-md justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative mx-2 custom-scrollbar"
            >
              <div className="flex justify-end">
                <button
                  onClick={addHotPickModalClose}
                  className="py-2 px-4 text-red-500 bg-error/15 delay-75 transition-all ease-linear duration-300 hover:bg-error/20 hover:text-red-700 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <AddNewBrandPage
                onClose={addHotPickModalClose}
                refetchHeroContent={fetchBrand}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden w-full max-w-md"
            >
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
              >
                <FiX size={18} />
              </button>

              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-xl border border-error">
                    <BiSolidError className="text-error" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                      Are You Sure
                    </h3>
                    <p className="text-sm text-gray-600">
                      Are you sure to delete this Category?
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                  <motion.button
                    onClick={handleModalClose}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg border-[1px] border-gray-400 text-black flex items-center gap-2 transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <PrimaryButton
                    customWidth="[200px]"
                    isSubmitting={isLoading}
                    text={"Delete"}
                    onClik={handleDeleteConfirm}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex backdrop-blur-md justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative mx-2 custom-scrollbar"
            >
              <div className="flex justify-end">
                <button
                  onClick={editingModalClose}
                  className="py-2 px-4 text-red-500 bg-error/15 delay-75 transition-all ease-linear duration-300 hover:bg-error/20 hover:text-red-700 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <UpdateBrand
                onClose={editingModalClose}
                item={editingItem}
                refetchHeroContent={fetchBrand}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brand;
