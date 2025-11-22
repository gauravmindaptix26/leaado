import { useState } from "react";
import SidebarUserCard from "./SidebarUserCard";
import SidebarMenuItem from "./SidebarMenuItem";
import logo from "../assets/Logo.png";
import {
  LuLayoutDashboard,
  LuFolderClosed,
  LuFileText,
  LuCreditCard,
  LuSettings
} from "react-icons/lu";

const navItems = [
  { label: "Dashboard", icon: LuLayoutDashboard },
  { label: "Leads", icon: LuFolderClosed },
  { label: "Pitch Templates", icon: LuFileText },
  { label: "Subscriptions", icon: LuCreditCard },
  { label: "Settings", icon: LuSettings }
];

export default function Sidebar({ onLogout }) {
  const [activeItem, setActiveItem] = useState(navItems[0].label);

  return (
    <aside className="w-full h-full flex flex-col bg-[#E6F0FF] border-r border-blue-100">
      {/* Sidebar content - scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <img src={logo} alt="Leaado" className="w-24 sm:w-32 object-contain" />
        </div>

        {/* User Card */}
        <SidebarUserCard />

        {/* Navigation Menu */}
        <nav className="mt-8 sm:mt-10 space-y-2">
          {navItems.map((item) => (
            <SidebarMenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </nav>
      </div>

      {/* Logout Button - Fixed at bottom */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 sm:py-6 border-t border-blue-100 bg-white/50">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 text-red-500 font-semibold py-2.5 sm:py-3 text-sm sm:text-base hover:bg-red-50 transition duration-200"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
