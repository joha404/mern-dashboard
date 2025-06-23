import { useState } from "react";
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  subMonths,
  isToday,
  isSameDay,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const EnhancedCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));
  const handleDateClick = (date) => setSelectedDate(date);

  const renderCalendar = () => {
    const startOfMonthDate = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const firstDayOfMonth = startOfMonthDate.getDay();

    const emptyCells = Array.from({ length: firstDayOfMonth }, () => null);
    const calendarCells = [...emptyCells, ...daysArray];

    return calendarCells.map((day, index) => {
      if (day === null) {
        return <div key={index} className="w-12 h-12" />;
      }

      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isCurrentDay = isToday(date);
      const isSelected = isSameDay(date, selectedDate);

      return (
          <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDateClick(date)}
              className={`relative w-12 h-12 flex items-center justify-center rounded-xl text-sm font-medium cursor-pointer transition-all duration-200
            ${
                  isCurrentDay
                      ? "bg-amber-500 text-white shadow-md"
                      : isSelected
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-800 hover:bg-indigo-100"
              }`}
          >
            {day}
            {isCurrentDay && (
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                />
            )}
          </motion.div>
      );
    });
  };

  return (
      <section
          className="w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth}
              className="bg-primary/10 hover:bg-primary/30 text-primary-dark/80 p-2 rounded-full shadow hover:shadow-md transition-all"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
              />
            </svg>
          </motion.button>

          <motion.h2
              key={currentDate.toString()}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-primary-dark tracking-tight"
          >
            {format(currentDate, "MMMM yyyy")}
          </motion.h2>

          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className="bg-primary/10 hover:bg-primary/30 text-primary-dark/80 p-2 rounded-full shadow hover:shadow-md transition-all"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div key={index} className="text-center text-sm font-semibold text-primary-dark/70">
                {day}
              </div>
          ))}
        </div>

        {/* Calendar Days */}
        <motion.div layout className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </motion.div>

        {/* Selected Date Display */}
        <AnimatePresence mode="wait">
          <motion.div
              key={selectedDate.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <div className="text-sm text-primary">Selected Date</div>
            <div className="text-lg font-semibold text-primary-dark/90">
              {format(selectedDate, "EEEE, MMMM do, yyyy")}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
  );
};

export default EnhancedCalendar;
