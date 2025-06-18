import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { AddNewBrand } from "../../../../api/operations/brand";
import PrimaryButton from "../../../common/PrimaryButton";

function AddNewBrandPage({ onClose, refetchHeroContent }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await AddNewBrand({ title: formData.title });

      console.log(formData.title);
      refetchHeroContent();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error Creating Brand:", error);
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
        <h1 className="text-center text-2xl font-semibold">Add New Brand</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brand Title"
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-gray-800 placeholder-gray-500"
          />
        </div>

        <div>
          <PrimaryButton
            isSubmitting={isLoading}
            text={"Add Brand"}
            onClik={handleSubmit}
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
                      Brand Added
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your new brand has been successfully added.
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

export default AddNewBrandPage;
