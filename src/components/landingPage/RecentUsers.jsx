import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import UserCard from "./UserCard.jsx";
import { getAllUsers } from "@/api/admin/user.js";
import { useState } from "react";

// Constants
const SKELETON_ITEMS = 5;

const RecentUsers = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  // Memoized status color getter
  const getStatusColor = useCallback((isActive) => {
    return isActive
      ? "bg-green-500 text-green-100"
      : "bg-amber-600 text-amber-100";
  }, []);

  // Memoized date formatter
  const formatDateTime = useCallback((dateStr) => {
    const date = new Date(dateStr);
    const dateOptions = { day: "2-digit", month: "long", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    return `${date.toLocaleDateString(
      "en-GB",
      dateOptions
    )} at ${date.toLocaleTimeString("en-US", timeOptions)}`;
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allusers = await getAllUsers();
        setUser(allusers.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-lg w-full rounded-2xl p-6 shadow-xl border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.h3
          whileHover={{ scale: 1.02 }}
          className="text-2xl font-bold text-primary-dark font-serif"
        >
          New Users
        </motion.h3>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/dashboard/settings/users"
            className="relative text-primary hover:text-primary-hover font-medium group"
            aria-label="View all users"
          >
            View All
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-hover transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      </div>

      {/* User List or Skeletons */}
      <div className="space-y-3">
        {loading || user.length === 0
          ? Array(SKELETON_ITEMS)
              .fill(null)
              .map((_, index) => (
                <UserSkeleton key={`skeleton-${index}`} index={index} />
              ))
          : user
              .slice(0, 5)
              .map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  getStatusColor={getStatusColor}
                  formatDateTime={formatDateTime}
                />
              ))}
      </div>
    </div>
  );
};

const UserSkeleton = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-gray-100 shadow-sm animate-pulse"
  >
    <div className="rounded-full w-12 h-12 bg-gray-200" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-1/3 bg-gray-200 rounded" />
      <div className="h-3 w-2/3 bg-gray-200 rounded" />
      <div className="flex items-center gap-2 mt-1">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-2 w-3/5 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="w-16 h-6 bg-gray-200 rounded-full" />
  </motion.div>
);

UserSkeleton.propTypes = {
  index: PropTypes.number,
};

export default RecentUsers;
