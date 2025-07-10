import React from "react";

export default function ProductSkeleton({ count = 5 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <tr
            key={i}
            className="hover:bg-gray-50 border-b sm:table-row grid grid-cols-1 sm:grid-cols-none sm:text-center text-left px-4 py-3 sm:p-0"
          >
            <td className="py-2 sm:p-4">
              <div className="w-20 h-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-10 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mx-auto"></div>
            </td>
            <td className="py-2 sm:p-4">
              <div className="flex justify-center gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}
