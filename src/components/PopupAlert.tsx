import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimes, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PopupAlert = ({ message, type, onClose }: { message: string; type: string; onClose: any }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-opacity-75 bg-indigo-900 flex justify-center items-center">
            <div className="bg-white rounded-lg w-96 p-8 relative text-center">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} size="1x" />
                </button>

                {/* Icon */}
                <div className="w-full text-center rounded-md mb-4">
                    {type === 'error' ? (
                        <FontAwesomeIcon icon={faExclamationCircle} size="4x" className="text-red-500" />
                    ) : (
                        <FontAwesomeIcon icon={faCircleCheck} size="4x" className="text-green-500" />
                    )}
                </div>

                {/* Scrollable Message */}
                <p className="mt-5 mb-5 text-center uppercase max-h-40 overflow-y-auto">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default PopupAlert;
