import React from 'react';
import TestimonialItem from './TestimonialItem';

const Testimonial = () => {
    const testimonials = [
        {
            image: '/userone.jpg',
            rating: 5,
            text: 'Eko Realty provided exceptional service when I was looking for a property in Lagos. Their professionalism and local expertise made the process seamless.',
            name: 'Adeola Ogunbiyi, Software Engineer',
        },
        {
            image: '/usertwo.jpg',
            rating: 4,
            text: 'The team at Eko Realty went above and beyond to find me a home that met my family’s needs. I am grateful for their dedication and responsiveness.',
            name: 'Chidi Okonkwo, Entrepreneur',
        },
        {
            image: 'userthree.jpg',
            rating: 5,
            text: 'Working with Eko Realty was an amazing experience. Their agents are knowledgeable, patient, and truly invested in helping you make the right decision.',
            name: 'Aisha Ibrahim, Fashion Designer',
        },
    ];

    return (
        <div className='px-10 py-20 bg-gray-50'>
            <div className='text-center mb-10'>
                <h2 className='text-5xl font-bold text-gray-800'>
                    Client Testimonials<span className='text-green-600'>.</span>
                </h2>
                <p className='text-lg text-gray-600'>
                    Hear what our satisfied clients have to say about their experiences with Eko Realty.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <TestimonialItem key={testimonial.name} {...testimonial} />
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
