import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";
import PropTypes from "prop-types";

export default function SuccessModal({
                                         show,
                                         onClose,
                                         onConfirm,
                                         title = "Success!",
                                         message = "",
                                         from = "",
                                         showRedirect = false,
                                         confirmText = "Okay",
                                         showConfirmButton = true,
                                         showCloseButton = false
                                     }) {
    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden w-full max-w-md"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all"
                        >
                            <FiX size={18} />
                        </button>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-7">
                            <div className="flex items-start gap-4 mb-5">
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: [0, 15, -15, 15, 0] }}
                                    transition={{ duration: 0.6 }}
                                    className="p-3 rounded-xl bg-green-100 border border-green-200"
                                >
                                    <FiCheckCircle className="text-green-600" size={24} />
                                </motion.div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
                                    <p className="text-sm text-gray-600">{message}</p>
                                </div>
                            </div>

                            {showRedirect && from && (
                                <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        You will be redirected to:
                                    </h4>
                                    <p className="text-xs text-gray-500">{from}</p>
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-200">
                                {showCloseButton && (
                                    <motion.button
                                        onClick={onClose}
                                        className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Close
                                    </motion.button>
                                )}
                                {showConfirmButton && (
                                    <motion.button
                                        onClick={onConfirm || onClose}
                                        className="px-5 py-2.5 text-sm font-medium rounded-lg bg-green-600 hover:bg-green-500 text-white flex items-center gap-2 transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FiCheckCircle size={16} />
                                        {confirmText}
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Visual Decoration */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-100 rounded-full blur-[80px] pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

SuccessModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    from: PropTypes.string,
    showRedirect: PropTypes.bool,
    confirmText: PropTypes.string,
    showConfirmButton: PropTypes.bool,
    showCloseButton: PropTypes.bool
};
