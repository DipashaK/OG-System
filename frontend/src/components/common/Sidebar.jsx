// import { Heart, Users, ClipboardList, Stethoscope, Activity, Settings, Menu } from "lucide-react";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const SIDEBAR_ITEMS = [
// 	{
// 		name: "Overview",
// 		icon: Heart,
// 		color: "#6366f1",
// 		href: "/overview",
// 	},
// 	{ name: "Donors", icon: Users, color: "#8B5CF6", href: "/donors" },
// 	{ name: "Recipients", icon: Stethoscope, color: "#EC4899", href: "/recipients" },
// 	{ name: "Track Organ", icon: Activity, color: "#10B981", href: "/track-organ" },
// 	{ name: "Matching", icon: Activity, color: "#10B981", href: "/matching" },
// 	{ name: "Calendar", icon: ClipboardList, color: "#F59E0B", href: "/calendar" },
// 	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
// ];

// const Sidebar = () => {
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

// 	return (
// 		<motion.div
// 			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
// 				isSidebarOpen ? "w-64" : "w-20"
// 			}`}
// 			animate={{ width: isSidebarOpen ? 256 : 80 }}
// 		>
// 			<div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
// 				{/* Sidebar Toggle Button */}
// 				<motion.button
// 					whileHover={{ scale: 1.1 }}
// 					whileTap={{ scale: 0.9 }}
// 					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// 					className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
// 				>
// 					<Menu size={24} />
// 				</motion.button>

// 				{/* User Profile Section - Below the Sidebar Button */}
// 				<div className="flex items-center space-x-4 mt-8">
// 					<img
// 						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1MCkcc9N01BCt6q1G12dXL2np82d63podA&s"
// 						alt="User Avatar"
// 						className="w-12 h-12 rounded-full"
// 					/>
// 					<AnimatePresence>
// 						{isSidebarOpen && (
// 							<motion.div
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								exit={{ opacity: 0 }}
// 								transition={{ duration: 0.2 }}
// 							>
// 								<h2 className="text-gray-100 text-lg font-medium">DIPASHA</h2>
// 								<p className="text-gray-400 text-sm">ADMIN</p>
// 							</motion.div>
// 						)}
// 					</AnimatePresence>
// 				</div>

// 				{/* Navigation Items */}
// 				<nav className="mt-8 flex-grow flex flex-col">
// 					{SIDEBAR_ITEMS.map((item) => (
// 						<Link key={item.href} to={item.href}>
// 							<motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
// 								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
// 								<AnimatePresence>
// 									{isSidebarOpen && (
// 										<motion.span
// 											className="ml-4 whitespace-nowrap"
// 											initial={{ opacity: 0, width: 0 }}
// 											animate={{ opacity: 1, width: "auto" }}
// 											exit={{ opacity: 0, width: 0 }}
// 											transition={{ duration: 0.2, delay: 0.3 }}
// 										>
// 											{item.name}
// 										</motion.span>
// 									)}
// 								</AnimatePresence>
// 							</motion.div>
// 						</Link>
// 					))}
// 				</nav>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default Sidebar;















import { Heart, Users, ClipboardList, Stethoscope, Activity, Settings, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: Heart,
    color: "#6366f1",
    href: "/overview",
  },
  { name: "Donors", icon: Users, color: "#8B5CF6", href: "/donors" },
  { name: "Recipients", icon: Stethoscope, color: "#EC4899", href: "/recipients" },
  { name: "Track Organ", icon: Activity, color: "#10B981", href: "/track-organ" },
  { name: "Matching", icon: Activity, color: "#10B981", href: "/matching" },
  { name: "Calendar", icon: ClipboardList, color: "#F59E0B", href: "/calendar" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Sidebar Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        {/* User Profile Section - Below the Sidebar Button */}
        <div className="flex items-center space-x-4 mt-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1MCkcc9N01BCt6q1G12dXL2np82d63podA&s"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-gray-100 text-lg font-medium">DIPASHA</h2>
                <p className="text-gray-400 text-sm">ADMIN</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 flex-grow flex flex-col overflow-y-auto scrollbar-thumb-indigo-500 scrollbar-track-gray-900 scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
