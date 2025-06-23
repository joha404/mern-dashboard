import { PiUsersThree } from "react-icons/pi";
import { FaPeopleGroup, FaPeopleCarryBox } from "react-icons/fa6";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
const Count = () => {
  const [loading, setLoading] = useState(false);
  const items = [
    {
      title: "Total Users",
      num: 40,
      icon: <PiUsersThree />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Products",
      num: 20,
      icon: <FaPeopleGroup />,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Total Categories",
      num: 15,
      icon: <FaPeopleCarryBox />,
      color: "from-gray-400 to-gray-500",
    },
  ];

  const skeletons = Array(3).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? skeletons.map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white p-6 rounded-[5px] shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-gray-300 rounded-md" />
                  <div className="h-8 w-20 bg-gray-300 rounded-md" />
                </div>
                <div className="w-16 h-16 bg-gray-300 rounded-md" />
              </div>
              <div className="mt-6 h-12 w-full bg-gray-200 rounded-md" />
              <div className="mt-3 flex gap-1 h-12">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full bg-gray-300 rounded-t-md"
                    style={{ height: `${((i % 3) + 4) * 10}%` }}
                  />
                ))}
              </div>
            </div>
          ))
        : items.map((item, index) => {
            let barColors = {
              even: "bg-blue-400/40",
              odd: "bg-blue-500/60",
            };

            if (item.color.includes("amber")) {
              barColors = {
                even: "bg-amber-400/40",
                odd: "bg-amber-500/60",
              };
            } else if (item.color.includes("gray")) {
              barColors = {
                even: "bg-gray-400/40",
                odd: "bg-gray-500/60",
              };
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-[5px]`}
                ></div>

                <div className="relative bg-white hover:bg-white/5 p-6 rounded-[5px] shadow-sm hover:shadow-md transition-all duration-300 ">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500">
                        {item.title}
                      </p>
                      <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {item.num}
                        </h2>
                      </div>
                    </div>

                    <motion.div
                      className={`w-16 h-16 flex items-center justify-center rounded-[5px] bg-gradient-to-br ${item.color} shadow-md`}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-white text-3xl">
                        {React.cloneElement(item.icon, {
                          className: "text-3xl",
                        })}
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 h-12 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent">
                    <div className="h-full flex items-end space-x-1">
                      {[3, 5, 7, 4, 6, 8, 5].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 10}%` }}
                          transition={{
                            delay: 0.5 + i * 0.05,
                            duration: 0.8,
                          }}
                          className={`w-full rounded-t-sm ${
                            i % 2 === 0 ? barColors.even : barColors.odd
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
    </div>
  );
};

export default Count;
