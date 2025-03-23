import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import bgMap from "../../public/bg_map.png";
import ImageTwo from "../../public/image2.jpeg";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const HowTo = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Map */}
      <div className="absolute inset-0">
        <Image
          src={bgMap}
          alt="Background Map"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-20"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gray-200 bg-opacity-20 px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Content */}
        <div className="flex flex-col space-y-8 justify-center">
          <div>
            <p className="text-4xl text-gray-700">Find your dream property</p>
            <p className="text-4xl text-blue-700">
              with Eko Realty<span className="text-gray-700">.</span>
            </p>
          </div>

          <div className="text-xl md:text-2xl mt-10 text-gray-700">
            <p>
              <CheckCircle className="text-blue-700 inline-block" /> Browse our
              curated listings
            </p>
            <p className="py-4">
              <CheckCircle className="text-blue-700 inline-block" /> Schedule a
              property viewing
            </p>
            <p>
              <CheckCircle className="text-blue-700 inline-block" /> Make an
              offer and close the deal
            </p>
          </div>

          <div>
            <Link
              href={`/properties`}
              className="bg-blue-700 hover:bg-blue-800 text-gray-200 rounded-md transition duration-500 px-10 py-3"
            >
              Explore Properties
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
          <Image
            src={ImageTwo}
            alt="Property View"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </div>
    </div>
  );
};

export default HowTo;
