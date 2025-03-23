import CreateListing from '@/components/CreateListing';
import React from 'react'

function Create() {
    return (
        <div>
            {/* Heading with Gradient Text */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent">
                 New Property
                </h2>
            </div>
            <CreateListing />
        </div>
    )
}

export default Create;