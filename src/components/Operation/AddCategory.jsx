import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle, FiX } from "react-icons/fi";
import PrimaryButton from "../common/PrimaryButton";
import { createCategory } from "@/api/category";

function AddCategory({ onClose, refreshCategories }) {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Local state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Watch image input for preview
  const imageWatch = watch("image");
  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      setPreviewUrl(URL.createObjectURL(imageWatch[0]));
    } else {
      setPreviewUrl(null);
    }
  }, [imageWatch]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      setLoading(true);
      await createCategory(formData);
      refreshCategories();
      setLoading(false);

      setShowSuccessModal(true);
      reset();
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error creating category:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg space-y-4"
      >
        <h1 className="text-center text-2xl font-semibold">Add New Category</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Category name"
              className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              {...register("description")}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg"
            />
          </div>

          {/* Image Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            isSubmitting={isSubmitting || loading}
            text={"Add Category"}
          />
        </form>
      </motion.div>

      {/* Success Modal */}
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
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
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
                      Category Added
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your category has been successfully created.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      setShowSuccessModal(false);
                      onClose();
                    }}
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
    </div>
  );
}

export default AddCategory;
