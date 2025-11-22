import { FiMessageSquare } from "react-icons/fi";

const leads = [
  {
    id: "S1110",
    company: "BrightTech",
    website: "brighttech.com",
    status: "Email Sent",
    pitchType: "Email",
    result: "Success",
    messageRecipient: "BrightTech.com",
    pitchMessage:
      "Hey! We’ve noticed your website has great potential but could benefit from stronger SEO performance. That’s where Leaado.ai comes in—a smart outreach automation tool built for agencies and freelancers. With just a few clicks, you can submit a list of websites, choose your service, and let our system automatically find contact emails or fill inquiry forms for you. No more manual outreach or wasted hours—just qualified leads, delivered straight to your inbox. 🚀 Start your journey today and get your first 5 leads free!"
  },
  {
    id: "S1111",
    company: "XYZ Studio",
    website: "xyzstudio.io",
    status: "Form Filled",
    pitchType: "Form",
    result: "Pending",
    messageRecipient: "xyzstudio.io",
    pitchMessage:
      "Hi team, sharing a tailored proposal to optimize your product landing pages and boost conversions with Leaado.ai."
  },
  {
    id: "S1112",
    company: "OmTech",
    website: "omtech.io",
    status: "Failed",
    pitchType: "Email",
    result: "Retry",
    messageRecipient: "omtech.io",
    pitchMessage:
      "Hello OmTech, following up to showcase how Leaado.ai automates cold outreach, freeing up your sales team."
  },
  {
    id: "S1113",
    company: "RamTech",
    website: "ramtech.co",
    status: "Email Sent",
    pitchType: "Email",
    result: "Success",
    messageRecipient: "ramtech.co",
    pitchMessage:
      "Hi RamTech, Leaado.ai can help you scale lead generation with ready pitch templates and automated tracking."
  },
  {
    id: "S1114",
    company: "Gauravtech",
    website: "gauravtech.io",
    status: "Email Sent",
    pitchType: "Email",
    result: "Success",
    messageRecipient: "gauravtech.io",
    pitchMessage:
      "Hello Gauravtech, here's a quick preview of your personalized pitch generated on Leaado.ai."
  }
];

export default function LeadsTable({ search, page, onViewMessage }) {
  const filtered = leads.filter((item) =>
    `${item.website} ${item.status} ${item.pitchType} ${item.result}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const statusClass = {
    "Email Sent": "bg-green-100 text-green-600",
    "Form Filled": "bg-gray-200 text-gray-600",
    Failed: "bg-red-100 text-red-600"
  };

  const resultClass = {
    Success: "bg-green-600 text-white",
    Pending: "bg-gray-400 text-white",
    Retry: "bg-red-500 text-white"
  };

  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead className="bg-gray-100 text-gray-600 text-xs sm:text-sm sticky top-0">
          <tr>
            <th className="py-2 sm:py-3 px-2 sm:px-5">S No.</th>
            <th className="py-2 sm:py-3 px-2 sm:px-5">Website</th>
            <th className="py-2 sm:py-3 px-2 sm:px-5">Status</th>
            <th className="py-2 sm:py-3 px-2 sm:px-5">Pitch Type</th>
            <th className="py-2 sm:py-3 px-2 sm:px-5">Pitch Result</th>
            <th className="py-2 sm:py-3 px-2 sm:px-5">View</th>
          </tr>
        </thead>

        <tbody className="text-xs sm:text-sm">
          {paginatedData.map((lead, index) => (
            <tr key={`${lead.id}-${index}`} className="border-t hover:bg-gray-50">
              <td className="py-2 sm:py-4 px-2 sm:px-5 font-medium">{lead.id}</td>
              <td className="py-2 sm:py-4 px-2 sm:px-5 text-blue-600 underline cursor-pointer hover:text-blue-800 break-all">
                {lead.website}
              </td>

              <td className="py-2 sm:py-4 px-2 sm:px-5">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${statusClass[lead.status]}`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="py-2 sm:py-4 px-2 sm:px-5">
                <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                  {lead.pitchType}
                </span>
              </td>

              <td className="py-2 sm:py-4 px-2 sm:px-5">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${resultClass[lead.result]}`}
                >
                  {lead.result}
                </span>
              </td>

              <td className="py-2 sm:py-4 px-2 sm:px-5">
                <button
                  type="button"
                  onClick={() => onViewMessage?.(lead)}
                  className="text-blue-600 flex items-center gap-1 hover:text-blue-800 font-medium whitespace-nowrap"
                >
                  <FiMessageSquare size={16} /> <span className="hidden sm:inline">View</span>
                </button>
              </td>
            </tr>
          ))}

          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500 text-xs sm:text-sm">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
