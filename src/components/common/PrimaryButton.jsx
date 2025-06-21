import React from "react";

export default function PrimaryButton({
  isSubmitting,
  text,
  onClik,
  customWidth = "w-full",
  className,
}) {
  return (
    <button
      onClick={onClik}
      type="submit"
      disabled={isSubmitting}
      className={`${customWidth} ${className} py-2 cursor-pointer px-4 rounded-lg bg-gradient-to-r from-[#6c6afa] to-[#432dd7] hover:from-[#432dd7]
                                       hover:to-[#5250d7] text-white font-medium shadow-lg hover:shadow-black/30 transition-all duration-300 flex items-center justify-center
                                       ${
                                         isSubmitting
                                           ? "opacity-80 cursor-not-allowed"
                                           : ""
                                       }`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
}
