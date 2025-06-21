import React, { useState, useEffect } from "react";

function MultipleImageUpload({ images, setImages }) {
  const [files, setFiles] = useState([null]);

  // Whenever files state changes, update parent images state
  useEffect(() => {
    const filteredFiles = files.filter((f) => f !== null);
    setImages(filteredFiles);
  }, [files, setImages]);

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);

    if (index === files.length - 1 && e.target.files.length > 0) {
      setFiles((prev) => [...prev, null]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    if (newFiles.length === 0) newFiles.push(null);
    setFiles(newFiles);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto">
      {files.map((file, i) => {
        const previewUrl = file ? URL.createObjectURL(file) : null;

        return (
          <label
            key={i}
            htmlFor={`uploadFile${i}`}
            className="w-32 h-32 flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer relative overflow-hidden flex items-center justify-center bg-white"
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold hover:bg-opacity-75"
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16v-4m0 0V8a4 4 0 118 0v4m-8 0h8"
                  />
                </svg>
                <span className="text-xs text-center">Upload Image</span>
              </div>
            )}

            <input
              id={`uploadFile${i}`}
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, i)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default MultipleImageUpload;
