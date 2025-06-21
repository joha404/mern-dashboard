import React, { useState, useEffect } from "react";

function ImageUploader({ onChange }) {
  const [files, setFiles] = useState([null]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = files.map((file) => (file ? URL.createObjectURL(file) : null));
    setPreviews(urls);
    onChange(files.filter(Boolean)); // send non-null files to parent

    return () => {
      urls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (e, i) => {
    const newFiles = [...files];
    newFiles[i] = e.target.files[0];
    if (i === files.length - 1 && e.target.files.length > 0) {
      newFiles.push(null);
    }
    setFiles(newFiles);
  };

  const removeFile = (i) => {
    const newFiles = [...files];
    newFiles.splice(i, 1);
    if (newFiles.length === 0) newFiles.push(null);
    setFiles(newFiles);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Images
      </label>
      <div className="flex gap-4 overflow-x-auto">
        {files.map((_, i) => (
          <label
            key={i}
            htmlFor={`uploadFile${i}`}
            className="w-32 h-32 relative flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-white"
          >
            {previews[i] ? (
              <>
                <img
                  src={previews[i]}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 text-white bg-black bg-opacity-60 rounded-full w-6 h-6 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                >
                  &times;
                </button>
              </>
            ) : (
              <div className="text-gray-400 pointer-events-none text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs">Upload</span>
              </div>
            )}
            <input
              id={`uploadFile${i}`}
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e, i)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
