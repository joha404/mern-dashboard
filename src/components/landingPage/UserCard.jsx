import {motion} from "framer-motion";
import {FiCalendar} from "react-icons/fi";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const DEFAULT_AVATAR =
    "https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const UserCard = ({user, getStatusColor, formatDateTime}) => {
    return (
        <Link to={`/user-details/${user._id}`} className="relative group cursor-pointer">
            <motion.div
                whileHover={{scale: 1.01}}
                transition={{type: "spring", stiffness: 300}}

            >
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"/>

                {/* Card */}
                <div
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    {/* Avatar */}
                    <motion.img
                        src={user.avatar || DEFAULT_AVATAR}
                        alt={user.fullName}
                        className="rounded-full w-12 h-12 object-cover shadow-md"
                        whileHover={{rotate: 5}}
                        loading="lazy"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg capitalize font-semibold text-primary-dark truncate">
                            {user.fullName}
                        </h4>
                        <p className="text-sm text-body truncate" title={user.email}>
                            {user.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <FiCalendar className="text-xs text-para"/>
                            <span className="text-xs text-para">
              Joined {formatDateTime(user.createdAt)}
            </span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <span
                        className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${getStatusColor(
                            user.isActive
                        )}`}
                        aria-label={`User is ${user.isActive ? "active" : "inactive"}`}
                    >
          {user.isActive ? "Active" : "Inactive"}
        </span>
                </div>
            </motion.div>
        </Link>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        avatar: PropTypes.string,
        createdAt: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date),
        ]).isRequired,
        _id:PropTypes.string
    }).isRequired,
    getStatusColor: PropTypes.func.isRequired,
    formatDateTime: PropTypes.func.isRequired,
};

export default UserCard;
