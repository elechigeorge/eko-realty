import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Total Listed Property Card */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 to-transparent"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faHome} className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl text-white">Total Listed Property</h2>
            <p className="text-3xl font-semibold text-white">0 Listed</p>
          </div>
        </div>
      </div>

      {/* Leads Card */}
      <div className="relative bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100 to-transparent"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl text-white">Prospects</h2>
            <p className="text-3xl font-semibold text-white">0 Leads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
