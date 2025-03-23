import { faCog, faEdit, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'


const Step3Media = ({ formData, onChange, onImageChange, onBack, onSubmit, loading }: { formData: any, onChange: any, onBack: any, onSubmit: any, loading: boolean, onImageChange: any }) => {
    



    return (
        <div className="space-y-6">
            {/* Upload Pictures */}
            <div>
                <h3 className="font-bold text-gray-700">Upload Pictures</h3>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faFileVideo}
                        className="text-indigo-500 w-6 h-6"
                    />
                    <input
                        type="file"
                        name="pictures"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                            onImageChange(
                                Array.from(e.target.files || [])
                            )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* Video Link */}
            <div>
                <h3 className="font-bold text-gray-700">Video Link</h3>
                <input
                    type="text"
                    name="videoLink"
                    placeholder="Paste video link (e.g., YouTube, Vimeo)"
                    value={formData.videoLink || ""}
                    onChange={(e) => onChange("videoLink", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="bg-gray-200 py-2 px-6 rounded-lg font-bold text-gray-700 hover:bg-gray-300"
                >
                    Back
                </button>
                <button
                    onClick={onSubmit}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded-lg font-bold shadow-md hover:shadow-lg"
                >
                    {loading ? <><FontAwesomeIcon icon={faCog} spin /> Working..</> : <><FontAwesomeIcon icon={faEdit} /> Submit</>}
                </button>
            </div>
        </div>
    );
};


export default Step3Media;