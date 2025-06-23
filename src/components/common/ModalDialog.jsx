import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { BiSolidError } from "react-icons/bi";
import PrimaryButton from "./PrimaryButton"; // Adjust the import path

function ModalDialog({
  show,
  onClose,
  onConfirm,
  buttonText1,
  buttonText2,
  isLoading = false,
  title = "Are You Sure?",
  message = "Are you sure you want to perform this action?",
}) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden w-full max-w-md"
          >
            <button
              onClick={onClose}
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
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">{message}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                <motion.button
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium rounded-lg border-[1px] border-gray-400 text-black flex items-center gap-2 transition-colors"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <PrimaryButton
                  customWidth="[200px]"
                  isSubmitting={isLoading}
                  onClick={onConfirm}
                >
                  {buttonText2}
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ModalDialog;
