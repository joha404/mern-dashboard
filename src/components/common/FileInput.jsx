import { useState } from "react";

function FileInput({ register }) {
  const [fileName, setFileName] = useState("No file chosen");

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="flex items-center justify-center cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16V4h10v12"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 12l5 5 5-5"
          />
        </svg>
        <span>{fileName}</span>
      </label>
      <input
        id="image-upload"
        type="file"
        {...register("image")}
        onChange={(e) =>
          setFileName(e.target.files[0]?.name || "No file chosen")
        }
        className="hidden"
      />
    </div>
  );
}

export default FileInput;
