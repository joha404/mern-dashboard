import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import CategoryDropdown from "@/components/common/CategoryDropdown";
import FeaturesInput from "@/components/common/FeatureInput";
import MultipleImageUpload from "@/components/common/MultipleImageUpload";
import PrimaryButton from "@/components/common/PrimaryButton";
import { getAllCategory } from "@/api/category";
import { AddNewProduct } from "@/api/product";

function AddProduct({ refreshProduct, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      features: [""], // at least one empty string to render input
    },
  });

  const [allCategories, setAllCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      setAllCategories(res.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to close modal
  const closeModal = () => setShowSuccessModal(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("oldPrice", data.oldPrice);
      formData.append("price", data.price);
      formData.append("stock", data.stock === "true" ? "true" : "false");

      if (data.category?.value) {
        formData.append("categoryName", data.category.name);
      } else if (typeof data.category === "string") {
        formData.append("categoryName", data.category);
      }

      images.forEach((file) => {
        formData.append("images", file);
      });

      // Send features as JSON string for consistent backend parsing
      if (data.features && Array.isArray(data.features)) {
        const filteredFeatures = data.features.filter((f) => f.trim() !== "");
        formData.append("features", JSON.stringify(filteredFeatures));
      }

      await AddNewProduct(formData);

      refreshProduct();
      reset();
      setImages([]);
      setShowSuccessModal(true); // Show success modal on successful submission
    } catch (err) {
      console.error("Error creating product:", err);
      // Optionally handle error UI here
    } finally {
      setLoading(false);
    }
  };
  const closeSuccessModal = () => {
    closeModal();
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-2xl text-center font-medium">Add New Product</h1>
        <input
          type="text"
          placeholder="Product name"
          {...register("name", { required: true })}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="number"
          placeholder="Old Price"
          {...register("oldPrice")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="number"
          placeholder="New Price"
          {...register("price")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <select
          {...register("stock")}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="true">Available</option>
          <option value="false">Out of Stock</option>
        </select>

        {/* Dropdown, Features, Images */}
        <CategoryDropdown control={control} categories={allCategories} />
        <FeaturesInput control={control} register={register} />
        <MultipleImageUpload images={images} setImages={setImages} />

        <PrimaryButton
          type="submit"
          isSubmitting={isSubmitting || loading}
          text="Add Product"
        />
      </form>

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
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                aria-label="Close success modal"
              >
                <FiX size={18} />
              </button>

              <div className="p-6 sm:p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-green-100 border border-green-200">
                    <FiCheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Product Added
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your product has been successfully created.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                  <motion.button
                    onClick={closeSuccessModal}
                    className="px-5 py-2.5 text-sm font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiCheckCircle size={16} />
                    Okay
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddProduct;
