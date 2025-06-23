import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiRefreshCw, FiChevronDown } from 'react-icons/fi';

const UserGrowthChart = () => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Generate realistic dummy data
    const generateDummyData = (selectedYear) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0-11

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Base growth pattern (can be adjusted)
        const basePattern = [100, 150, 200, 250, 300, 400,
            500, 650, 800, 950, 1100, 1300];

        // Add some randomness
        const randomize = (value) => {
            const variation = value * 0.3; // ±30% variation
            return Math.max(0, value + (Math.random() * variation * 2 - variation));
        };

        return months.map((month, index) => {
            const displayYear = index <= currentMonth ? currentYear : currentYear - 1;

            // Only generate data for selected year
            if (displayYear !== selectedYear) {
                return {
                    name: `${month} ${displayYear}`,
                    shortName: month,
                    users: 0
                };
            }

            // Calculate position in growth curve (with year-over-year growth)
            const yearGrowthFactor = 1 + (0.5 * (selectedYear - currentYear + 1)); // 50% YoY growth
            const baseValue = basePattern[index] * yearGrowthFactor;

            return {
                name: `${month} ${displayYear}`,
                shortName: month,
                users: Math.round(randomize(baseValue))
            };
        });
    };

    // Simulate API call
    const fetchData = (selectedYear) => {
        setIsLoading(true);
        setTimeout(() => {
            setChartData(generateDummyData(selectedYear));
            setIsLoading(false);
        }, 800); // Simulate network delay
    };

    useEffect(() => {
        fetchData(year);
    }, [year]);

    // Year options (current year and previous years)
    const yearOptions = Array.from(
        { length: 5 },
        (_, i) => new Date().getFullYear() - i
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/50"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <motion.h3
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 font-serif"
                    >
                        User Growth (12 Months)
                    </motion.h3>

                    <motion.button
                        whileHover={{ rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fetchData(year)}
                        disabled={isLoading}
                        className="p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                        <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
                    </motion.button>
                </div>

                {/* Year Dropdown */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                    >
                        <FiCalendar className="text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {year}
            </span>
                        <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-full min-w-[120px] bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-600"
                            >
                                {yearOptions.map((y) => (
                                    <button
                                        key={y}
                                        onClick={() => {
                                            setYear(y);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                                            year === y
                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300'
                                                : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Chart */}
            <div className="h-96 relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Loading data...</div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="h-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
                                <XAxis
                                    dataKey="shortName"
                                    tick={{ fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        backdropFilter: 'blur(4px)'
                                    }}
                                    labelStyle={{ color: '#374151', fontWeight: 600 }}
                                    formatter={(value) => [`${value} users`, 'Total Users']}
                                    labelFormatter={(label) => {
                                        const monthData = chartData.find(d => d.shortName === label);
                                        return monthData ? monthData.name : label;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#6366F1"
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                    strokeWidth={2}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiCalendar />
                <span>
          {isLoading ? 'Generating data...' : `Showing ${chartData[0]?.name} to ${chartData[chartData.length - 1]?.name}`}
        </span>
            </div>
        </motion.div>
    );
};

export default UserGrowthChart;