import Link from "next/link";

const InfoSection = () => {
    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-between space-x-2 px-6 lg:px-16 py-16 overflow-hidden bg-gradient-to-r from-blue-500 to-teal-400">
            {/* Background Animation */}
            <div className="absolute inset-0 flex justify-center items-center overflow-hidden -z-10">
                <div className="w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="w-72 h-72 bg-indigo-800 rounded-full blur-2xl opacity-30 animate-pulse delay-150" />
            </div>

            {/* Image Section */}
            <div
                className="hidden lg:block lg:w-1/2"
            >
                <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Luxury Home"
                    className="rounded-xl shadow-xl"
                />
            </div>

            {/* Text Section */}
            <div
                className="lg:w-1/2 text-center lg:text-left"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-6">
                    Let us find the home of your dreams.
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                    Whether it's a modern apartment in Ikoyi, a luxurious estate in
                    Lekki, or a serene beachfront home in Victoria Island, we at{" "}
                    <span className="font-semibold text-blue-600">Eko Realty</span> have
                    you and your family covered.
                </p>
                <Link
                    href="/properties"
                    className="inline-block bg-blue-600 text-white font-medium text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                >
                    VIEW COMMUNITIES
                </Link>
            </div>
        </div>
    );
};

export default InfoSection;