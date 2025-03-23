import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AdCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
      {/* Image */}
      <div className="relative h-48 md:h-auto md:w-1/2">
        <Image
          src={`/ad.png`}
          alt="Ad Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg md:rounded-none md:rounded-l-lg"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:w-1/2 flex flex-col justify-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Boost Your Listings!
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Promote your properties to thousands of potential buyers and get more
          leads with our premium advertising plans.
        </p>

        {/* Call-to-Action Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
          <FontAwesomeIcon icon={faShoppingCart} /> Buy Subscription 
        </button>
      </div>
    </div>
  );
};

export default AdCard;
