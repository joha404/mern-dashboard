import { NavLink } from "react-router-dom";
import { FiEye } from "react-icons/fi";

export default function UserRow({ user, onStatusClick }) {
  return (
    <tr className="text-center border-b hover:bg-gray-50">
      <td>
        <div className="flex justify-center items-center">
          <div className="rounded-full bg-gray-200 flex items-center justify-center">
            <div className="relative w-12 h-12">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                }
                alt={user.name}
                className="rounded-full w-12 h-full object-cover shadow-md"
                whileHover={{ rotate: 5 }}
              />
            </div>
          </div>
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.number}</td>
      <td className="p-4">
        <select
          value={user.isVerified ? "Active" : "Inactive"}
          onChange={(e) => onStatusClick(user, e.target.value === "Active")}
          className={`text-sm font-semibold capitalize py-1 px-3 rounded-lg border focus:outline-none transition-all duration-200
      ${
        user.isVerified
          ? "bg-green-100 text-green-700 border-green-300 focus:ring-2 focus:ring-green-300"
          : "bg-red-100 text-red-700 border-red-300 focus:ring-2 focus:ring-red-300"
      }
    `}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </td>

      <td className="p-4 relative flex justify-center items-center gap-x-1">
        <NavLink
          to={`/user-info/${user?._id}`}
          className="flex items-center px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg"
        >
          <FiEye className="mr-1.5" /> View
        </NavLink>
      </td>
    </tr>
  );
}
