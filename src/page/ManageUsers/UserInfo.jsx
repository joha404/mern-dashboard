import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getSingleUser } from "@/api/admin/user";

function UserInfo() {
  const [userinfo, setUserInfo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneUser = async (id) => {
      try {
        const response = await getSingleUser(id);
        setUserInfo(response.data);
      } catch (error) {
        console.log("Failed to get User");
      }
    };
    getOneUser(id);
  }, [id]);

  const placeholderImage =
    "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-8"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/manag-users")}
        className="mb-6 px-4 py-2 rounded-full bg-primary hover:bg-primary text-white transition-all duration-300 shadow-md"
      >
        ← Back
      </button>

      {/* Main Card */}
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white w-full max-w-2xl shadow-xl rounded-xl overflow-hidden"
        >
          <div className="px-6 py-6 sm:px-8">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={placeholderImage}
                alt="User Avatar"
                className="h-32 w-32 rounded-full border-4 border-primary object-cover shadow"
              />
            </div>
            <p className="text-center text-gray-600">
              Details and information about user.
            </p>
          </div>

          {/* Details */}
          <div className="border-t border-gray-200">
            <dl>
              {[
                ["Full Name", userinfo.name],
                ["Email Address", userinfo.email],
                ["Phone", userinfo.number],
                ["Status", userinfo.isVerified ? "✅ Active" : "❌ Inactive"],
              ].map(([label, value], idx) => (
                <div
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } px-6 py-4 grid grid-cols-3 gap-4 text-sm`}
                >
                  <dt className="font-medium text-gray-500">{label}</dt>
                  <dd className="col-span-2 text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UserInfo;
