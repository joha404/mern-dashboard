import {motion} from "framer-motion";
import {FaHome, FaBuilding, FaTree, FaUmbrellaBeach} from "react-icons/fa";
import {FiCalendar, FiStar} from "react-icons/fi";
import {Link} from "react-router-dom";
import BubbleAnimation from "../common/BubbleAnimation.jsx";

const RecentHosts = () => {
    const hosts = [
        {
            id: 1,
            name: "Sarah Johnson",
            property: "Luxury Beach Villa",
            type: "villa",
            joinDate: "15 May 2023",
            rating: 4.8,
            listings: 3,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            property: "Downtown Loft",
            type: "apartment",
            joinDate: "28 Apr 2023",
            rating: 4.5,
            listings: 5,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            name: "Emily Wilson",
            property: "Mountain Cabin",
            type: "cabin",
            joinDate: "12 Jun 2023",
            rating: 4.9,
            listings: 2,
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            id: 4,
            name: "David Brown",
            property: "City Penthouse",
            type: "penthouse",
            joinDate: "3 Jun 2023",
            rating: 4.7,
            listings: 4,
            avatar: "https://randomuser.me/api/portraits/men/75.jpg"
        },
        {
            id: 4,
            name: "David Moin",
            property: "City Penthouse",
            type: "penthouse",
            joinDate: "10 Jun 2023",
            rating: 4.7,
            listings: 4,
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        }
    ];

    const getPropertyIcon = (type) => {
        switch (type) {
            case 'villa':
                return <FaUmbrellaBeach className="text-amber-500"/>;
            case 'apartment':
                return <FaBuilding className="text-blue-500"/>;
            case 'cabin':
                return <FaTree className="text-green-500"/>;
            default:
                return <FaHome className="text-indigo-500"/>;
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-white/80 backdrop-blur-lg w-full rounded-2xl p-6 shadow-xl border border-white/20 dark:bg-gray-900/80 dark:border-gray-700/50"
        >
            <BubbleAnimation />
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <motion.h3
                    whileHover={{scale: 1.02}}
                    className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 font-serif"
                >
                    Recent Hosts
                </motion.h3>

                <motion.div whileHover={{scale: 1.05}}>
                    <Link
                        to="/hosts"
                        className="relative text-indigo-600 dark:text-indigo-400 font-medium group"
                    >
                        View All
                        <span
                            className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>
            </div>

            {/* Hosts List */}
            <div className="space-y-3">
                {hosts.map((host) => (
                    <motion.div
                        key={host.id}
                        whileHover={{scale: 1.01}}
                        transition={{type: "spring", stiffness: 300}}
                        className="relative group"
                    >
                        {/* Glow effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"></div>

                        {/* Host Card */}
                        <div
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
                            {/* Avatar with property icon */}
                            <div className="relative">
                                <motion.img
                                    src={host.avatar}
                                    alt={host.name}
                                    className="rounded-full w-12 h-12 object-cover shadow-md"
                                    whileHover={{rotate: 5}}
                                />
                                <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full dark:bg-gray-800">
                                    <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-sm">
                                        {getPropertyIcon(host.type)}
                                    </div>
                                </div>
                            </div>

                            {/* Host Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {host.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                    {host.property}
                                </p>
                                <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs mt-1">
                                    <FiCalendar className="mr-1"/>
                                    <span>Joined {host.joinDate}</span>
                                </div>
                            </div>

                            {/* Listings Badge */}
                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Listings:
                                    <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 ml-1">{host.listings}</span>
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center text-amber-500">
                                        <FiStar className="mr-1 fill-current"/>
                                        <span className="text-xs font-medium">{host.rating}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentHosts;