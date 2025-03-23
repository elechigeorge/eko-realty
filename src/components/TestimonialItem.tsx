import React from 'react';
import { Star } from 'lucide-react'; // Replacing FontAwesome with lucide-react for a modern look

const TestimonialItem = ({ image, rating, text, name }: {image: any, rating: any, text: any, name: any}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg text-center p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <img
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                src={image}
                alt="Testimonial author"
            />
            <div className="flex items-center mb-2">
                {Array(5).fill(0).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-blue-500' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <p className="text-gray-700 text-base leading-loose mb-4">{text}</p>
            <p className="text-green-600 font-medium">{name}</p>
        </div>
    );
};

export default TestimonialItem;
