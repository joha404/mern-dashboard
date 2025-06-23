import { motion } from "framer-motion";
import { FiClock, FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";
import { FaAirbnb, FaUber, FaHotel, FaPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import BubbleAnimation from "../common/BubbleAnimation.jsx";

const RecentBookings = () => {
    const bookings = [
        {
            id: 1,
            customer: "John Smith",
            service: "Hotel Booking",
            date: "15 Jun 2023",
            time: "10:30 AM",
            status: "confirmed",
            amount: "$245",
            icon: <FaHotel className="text-blue-500" />
        },
        {
            id: 2,
            customer: "Sarah Johnson",
            service: "Airbnb Rental",
            date: "16 Jun 2023",
            time: "2:15 PM",
            status: "pending",
            amount: "$180",
            icon: <FaAirbnb className="text-rose-500" />
        },
        {
            id: 3,
            customer: "Michael Chen",
            service: "Flight Ticket",
            date: "17 Jun 2023",
            time: "8:45 AM",
            status: "confirmed",
            amount: "$420",
            icon: <FaPlane className="text-indigo-500" />
        },
        {
            id: 4,
            customer: "Emily Wilson",
            service: "Ride Booking",
            date: "18 Jun 2023",
            time: "5:20 PM",
            status: "cancelled",
            amount: "$35",
            icon: <FaUber className="text-gray-300" />
        },
        {
            id: 5,
            customer: "David Brown",
            service: "Hotel Booking",
            date: "19 Jun 2023",
            time: "11:00 AM",
            status: "pending",
            amount: "$195",
            icon: <FaHotel className="text-blue-500" />
        }
    ];

    const statusStyles = {
        confirmed: "bg-green-100 text-green-800",
        pending: "bg-amber-100 text-amber-800",
        cancelled: "bg-red-100 text-red-800"
    };

    const statusIcons = {
        confirmed: <FiCheckCircle className="mr-1" />,
        pending: <FiClock className="mr-1" />,
        cancelled: <FiXCircle className="mr-1" />
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-lg w-full rounded-2xl p-6 shadow-xl border border-white/20 dark:bg-gray-900/80 dark:border-gray-700/50"
        >
            <BubbleAnimation />
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <motion.h3
                    whileHover={{ scale: 1.02 }}
                    className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 font-serif"
                >
                    Recent Bookings
                </motion.h3>

                <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                        to="/bookings"
                        className="relative text-indigo-600 dark:text-indigo-400 font-medium group"
                    >
                        View All
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>
            </div>

            {/* Bookings List */}
            <div className="space-y-3">
                {bookings.map((booking) => (
                    <motion.div
                        key={booking.id}
                        transition={{ type: "spring", stiffness: 300 }}
                        whileHover={{scale: 1.01}}
                        className="relative group"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"></div>

                        {/* Booking Card */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
                            {/* Service Icon */}
                            <motion.div
                                whileHover={{ rotate: 5 }}
                                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-600/20"
                            >
                                {booking.icon}
                            </motion.div>

                            {/* Booking Details */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {booking.service}
                                </h4>
                               <p className="text-sm text-gray-600 dark:text-gray-300">{booking.customer}</p>
                               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">• {booking.date} at {booking.time}</p>
                            </div>

                            {/* Amount and Status */}
                            <div className="flex flex-col items-end">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {booking.amount}
                                </p>
                                <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${statusStyles[booking.status]} mt-1`}>
                  {statusIcons[booking.status]}
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentBookings;