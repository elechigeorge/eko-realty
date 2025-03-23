import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Marquee from "react-fast-marquee";

const StarRating = ({ stars }: { stars: any }) => {
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${index < stars ? "text-blue-500" : "text-gray-300"
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.461a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.392-2.461a1 1 0 00-1.176 0l-3.392 2.461c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.297 9.394c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
            ))}
        </div>
    );
};

const ScrollingReviews = () => {
    const categories = [
        {
            id: 1,
            title: "Luxury Villas",
            image: "/home.jpeg",
            listings: 12,
        },
        {
            id: 2,
            title: "Cozy Apartments",
            image: "/home.jpeg",
            listings: 8,
        },
        {
            id: 3,
            title: "Beachfront Houses",
            image: "/home.jpeg",
            listings: 5,
        },
        {
            id: 4,
            title: "Modern Condos",
            image: "/home.jpeg",
            listings: 10,
        },
        {
            id: 5,
            title: "Country Homes",
            image: "/home.jpeg",
            listings: 7,
        },
    ];


    return (
        <div className="overflow-hidden bg-gray-100">
            <div className="text-center px-6 py-10 lg:px-16 lg:py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                    The Most Attractive Deals
                    <span className="text-blue-500">.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-500 mt-4">
                    Highlight the best of your properties by using the List Category
                    shortcode. You can list categories, types, cities, areas, and states.
                </p>
            </div>
            <Marquee autoFill={true} gradient={false} speed={50}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative h-64 w-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-5"
                    >
                        {/* Background Image */}
                        <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-20 transition-all duration-300"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                            <h3 className="text-2xl font-bold">{category.title}</h3>
                            <p className="mt-2 bg-gray-800 bg-opacity-70 px-4 py-1 rounded-full">
                                {category.listings} Listings
                            </p>
                        </div>
                    </div>
                ))}
            </Marquee>

            <div className="flex w-36 justify-center items-center space-x-2 py-10 mx-auto">
                
                <FontAwesomeIcon icon={faStar} className="text-blue-500" />
                <FontAwesomeIcon icon={faStar} className="text-blue-500 text-5xl" />
                <FontAwesomeIcon icon={faStar} className="text-blue-500" />
                
            </div>
        </div>
    );
};

export default ScrollingReviews;
