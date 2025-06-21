import React, { useState } from "react";

function FeaturesInput({ register }) {
  const [featureCount, setFeatureCount] = useState(1); // Just manage count

  const addFeature = () => setFeatureCount((prev) => prev + 1);

  const removeFeature = (index) => {
    if (featureCount === 1) return; // Always keep one
    setFeatureCount((prev) => prev - 1);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Features
      </label>
      {[...Array(featureCount)].map((_, index) => (
        <div key={index} className="flex items-center mb-2 space-x-2">
          <input
            type="text"
            placeholder={`Feature #${index + 1}`}
            {...register(`features.${index}`)} // <-- correct dynamic name
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-lg"
          />
          {featureCount > 1 && (
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="text-red-500 font-bold text-lg px-2"
              title="Remove"
            >
              &times;
            </button>
          )}
          {index === featureCount - 1 && (
            <button
              type="button"
              onClick={addFeature}
              className="text-green-600 font-bold text-xl px-3"
              title="Add feature"
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeaturesInput;
