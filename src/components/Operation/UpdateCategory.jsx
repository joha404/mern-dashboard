import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import PrimaryButton from "../common/PrimaryButton";

function UpdateCategory({ item, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Prefill form with item values
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
      });
    }

    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const UpdatePiks = async () => {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);

      // await UpdateTheCategory(data, item._id);
      // refetchHeroContent();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating hotpiks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg space-y-4"
      >
        <h1 className="text-center text-2xl font-semibold">Update HotPiks</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Category Title"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-gray-800 placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Category Description"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-gray-800 placeholder-gray-500"
          />
        </div>

        <div>
          <PrimaryButton
            isSubmitting={isLoading}
            text={"Save Changes"}
            onClik={UpdatePiks}
          />
        </div>
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
                onClick={handleModalClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
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
                      Hero Content Updated
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your Hero Section Information has been successfully
                      updated.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                  <motion.button
                    onClick={handleSuccessConfirm}
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

export default UpdateCategory;
