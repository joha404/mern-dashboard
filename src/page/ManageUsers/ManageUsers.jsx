import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchAndTabs from "../../components/manageUsers/SearchAndTabs";
import UserTable from "../../components/manageUsers/UserTable";
import Pagination from "../../components/common/Pagination";
import ConfirmStatusModal from "../../components/manageUsers/ConfirmStatusModal";
import { getAllUsers } from "@/api/admin/user";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      activeTab === "All"
        ? true
        : activeTab === "Active"
        ? user.isActive
        : !user.isActive
    )
    .filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredUsers.length / userPerPage);
  const indexOfLast = currentPage * userPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfLast - userPerPage,
    indexOfLast
  );

  const handleStatusConfirm = async () => {
    if (!selectedUser) return;
    try {
      await userStatusUpdate(selectedUser._id, { isActive: pendingStatus });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, isActive: pendingStatus } : u
        )
      );
      setShowAlert(false);
      setSelectedUser(null);
      setPendingStatus(null);
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <motion.div className="px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Manage Users</h1>

      <SearchAndTabs
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userPerPage={userPerPage}
        setUserPerPage={setUserPerPage}
      />

      <UserTable
        users={currentUsers}
        loading={loading}
        onStatusClick={(user, newStatus) => {
          setSelectedUser(user);
          setPendingStatus(newStatus);
          setShowAlert(true);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmStatusModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleStatusConfirm}
        pendingStatus={pendingStatus}
      />
    </motion.div>
  );
}
