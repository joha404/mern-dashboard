import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import GetAllCategory from "@/components/Operation/GetAllCategory";
import PrimaryButton from "@/components/common/PrimaryButton";
import UpdateCategory from "@/components/Operation/UpdateCategory";
import AddCategory from "@/components/Operation/AddCategory";
import { BiSolidError } from "react-icons/bi";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addCategory, setaddCategory] = useState(false);
  const [showSuccessModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const category = [
    {
      id: 1,
      title: "Electronics",
      description:
        "Devices and gadgets including smartphones, laptops, and accessories.",
      date: "2025-06-18",
    },
    {
      id: 2,
      title: "Fashion",
      description:
        "Apparel, footwear, and accessories for men, women, and kids.",
      date: "2025-06-18",
    },
    {
      id: 3,
      title: "Home & Kitchen",
      description: "Furniture, appliances, cookware, and home decor items.",
      date: "2025-06-18",
    },
    {
      id: 4,
      title: "Books",
      description:
        "Wide range of fiction, non-fiction, educational, and children's books.",
      date: "2025-06-18",
    },
    {
      id: 5,
      title: "Beauty & Personal Care",
      description: "Skincare, haircare, makeup, and wellness products.",
      date: "2025-06-18",
    },
    {
      id: 6,
      title: "Sports & Outdoors",
      description:
        "Equipment and gear for fitness, outdoor adventures, and team sports.",
      date: "2025-06-18",
    },
    {
      id: 7,
      title: "Toys & Games",
      description: "Games, puzzles, and toys for kids of all ages.",
      date: "2025-06-18",
    },
  ];

  // const fetchCategory = async () => {
  //   try {
  //     const response = await getAllCategories();
  //     console.log(response.data.data.categories);
  //     setCategory(response.data.data.categories);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Failed to fetch category:", error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategory();
  // }, []);

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

  const addCategoryModalOpen = () => {
    setaddCategory(true);
  };
  const addHotPickModalClose = () => {
    setaddCategory(false);
  };

  const deleteCategory = (id) => {
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
      console.log(selectedId);
      setShowDeleteModal(false);
      setSelectedId(null);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to delete category", error);
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
              className="absolute left-3 top-5 -translate-y-1/2 text-gray-400"
            >
              <FiSearch />
            </motion.span>
            <input
              type="text"
              placeholder="Search by title"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-[#6c6afa]"
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
              // isSubmitting={isLoading}
              text={"Add New"}
              onClik={addCategoryModalOpen}
            />
          </div>
        </div>
      </div>
      <GetAllCategory
        loading={loading}
        onDelete={deleteCategory}
        onUpdate={handleUpdate}
        allCategories={category.filter((item) =>
          item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )}
      />

      <AnimatePresence>
        {addCategory && (
          <div className="fixed inset-0 z-50 bg-black/40 bg-opacity-50 flex backdrop-blur-md justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative mx-2 custom-scrollbar"
            >
              <div className="flex justify-end">
                <button
                  onClick={addHotPickModalClose}
                  className="py-2 px-4 text-red-500 bg-red-100 hover:bg-red-700 
                  hover:text-white cursor-pointer delay-75 transition-all ease-linear duration-300 
                    rounded-lg"
                >
                  ✕
                </button>
              </div>

              <AddCategory onClose={addHotPickModalClose} />
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
          <div className="fixed inset-0 z-50 bg-black/40 bg-opacity-10 flex backdrop-blur-md justify-center items-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative mx-2 custom-scrollbar"
            >
              <div className="flex justify-end">
                <button
                  onClick={editingModalClose}
                  className="py-2 px-4 text-red-500 bg-red-100 hover:bg-red-700 
                  hover:text-white cursor-pointer delay-75 transition-all ease-linear duration-300 
                    rounded-lg"
                >
                  ✕
                </button>
              </div>

              <UpdateCategory
                onClose={editingModalClose}
                item={category}
                // refetchHeroContent={fetchCategory}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Category;
