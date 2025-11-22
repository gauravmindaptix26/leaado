import { useState, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { StatsCard } from "../components/StatsCard";
import LeadsTable from "../components/LeadsTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import RevenueCard from "../components/RevenueCard";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

import AddNewClientModal from "../components/AddNewClientModal";
import ViewMessageModal from "../components/ViewMessageModal";
import BulkLeadsModal from "../components/BulkLeadsModal";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 11;

  const [openAddClient, setOpenAddClient] = useState(false);
  const [openBulkLeads, setOpenBulkLeads] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleViewMessage = (lead) => {
    setSelectedLead(lead);
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-[#E6F0FF] z-20">
        <Sidebar onLogout={handleLogout} />
      </aside>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar - Fixed overlay */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 z-50 lg:hidden transition-transform duration-300 ease-in-out bg-[#E6F0FF] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onLogout={() => { handleLogout(); closeSidebar(); }} />
      </aside>

      {/* Main content area */}
      <main className="lg:ml-72 w-full min-h-screen flex flex-col">
        {/* Mobile/Tablet header with hamburger menu */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800 px-2">Dashboard</h1>
          <div className="w-10" />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Dashboard Header */}
            <DashboardHeader
              onAddBulkLeads={() => setOpenBulkLeads(true)}
              onAddNewClient={() => setOpenAddClient(true)}
            />

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-10">
              <StatsCard title="Active Leads" value="25" change="+25%" />
              <StatsCard title="Pitches Sent" value="51" change="+45%" />
              <StatsCard title="Success Rate" value="26" change="+60%" />
              <StatsCard title="Revenue Generated" value="$25.30K" change="+80%" />
              <StatsCard title="Trials Used" value="2" change="3 Credits Left Only" tone="negative" />
            </div>

            {/* Leads Section */}
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Leads Progress</h2>

            <SearchBar search={search} setSearch={setSearch} />

            <LeadsTable search={search} page={page} onViewMessage={handleViewMessage} />

            <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />

            {/* Revenue Card */}
            <div className="mt-8 sm:mt-10">
              <RevenueCard />
            </div>
          </div>
        </div>

        {/* Footer - Sticky at bottom */}
        <Footer />
      </main>

      {/* Modals */}
      <AddNewClientModal open={openAddClient} onClose={() => setOpenAddClient(false)} />
      <BulkLeadsModal open={openBulkLeads} onClose={() => setOpenBulkLeads(false)} />
      <ViewMessageModal open={openMessage} lead={selectedLead} onClose={handleCloseMessage} />
    </div>
  );
}
