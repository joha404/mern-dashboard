import { motion } from "framer-motion";
import Count from "../../components/landingPage/Count.jsx";
import EnhancedCalendar from "../../components/landingPage/EnhancedCalendar.jsx";
import RecentUsers from "../../components/landingPage/RecentUsers.jsx";
import "react-quill-new/dist/quill.snow.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LandingPage() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col w-full"
    >
      {/* Count Section */}
      <motion.div
        variants={itemVariants}
        className="transition-opacity duration-500"
      >
        <Count />
      </motion.div>

      {/* Grid Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14 transition-opacity duration-500"
      >
        <RecentUsers />
        <EnhancedCalendar />
      </motion.div>
    </motion.section>
  );
}
