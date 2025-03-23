import ListingsPage from '@/components/Listing'
import React from 'react'

function Listing() {
    return (
        <div>
            {/* Heading with Gradient Text */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-b from-blue-500 to-green-500 bg-clip-text text-transparent">
                    My Listings
                </h2>
            </div>

            <ListingsPage />
        </div>
    )
}

export default Listing