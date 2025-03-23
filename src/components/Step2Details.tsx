import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";

const Step2Details = ({
  formData,
  onChange,
  onNext,
  onBack,
}: {
  formData: any;
  onChange: any;
  onBack: any;
  onNext: any;
}) => {
  const [acceptInstallment, setAcceptInstallment] = useState(false);

  const amenitiesOptions = [
    "Pool",
    "Parking",
    "Gym",
    "Security",
    "Playground",
    "Air Conditioning",
  ];

  const featuresOptions = ["Serviced", "Newly Built", "Furnished"];

  const denominations = ["NGN", "USD"];
  const priceAppends = ["/year", "/month", "/sqm", "/day"];

  return (
    <div className="space-y-6">
      {/* Price and Denomination */}
      <div>
        <h3 className="font-bold text-gray-700">Price</h3>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price || ""}
            onChange={(e) => onChange("price", parseFloat(e.target.value))}
            className="w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            name="denomination"
            value={formData.denomination || ""}
            onChange={(e) => onChange("denomination", e.target.value)}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Currency</option>
            {denominations.map((denomination) => (
              <option key={denomination} value={denomination}>
                {denomination}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Accept Installment */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptInstallment}
            onChange={(e) => {
              setAcceptInstallment(e.target.checked);
              onChange("acceptInstallment", e.target.checked);
            }}
            className="form-checkbox"
          />
          <span className="font-bold text-gray-700">Accept Installment?</span>
        </label>
        {acceptInstallment && (
          <div className="space-y-4 mt-4">
            <input
              type="number"
              name="initialDeposit"
              placeholder="Initial Deposit"
              value={formData.initialDeposit || ""}
              onChange={(e) => onChange("initialDeposit", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="monthlyInstallment"
              placeholder="Monthly Installment"
              value={formData.monthlyInstallment || ""}
              onChange={(e) => onChange("monthlyInstallment", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (in months)"
              value={formData.duration || ""}
              onChange={(e) => onChange("duration", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Price Append */}
      <div>
        <h3 className="font-bold text-gray-700">Price Append</h3>
        <select
          name="priceAppend"
          value={formData.priceAppend || ""}
          onChange={(e) => onChange("priceAppend", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Pricing Basis</option>
          {priceAppends.map((append) => (
            <option key={append} value={append}>
              {append}
            </option>
          ))}
        </select>
      </div>

      {/* Bedroom, Bathroom, Toilet */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700">Property Details</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            name="bedroom"
            placeholder="Bedrooms"
            value={formData.bedroom || ""}
            onChange={(e) => onChange("bedroom", e.target.value)}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="bathroom"
            placeholder="Bathrooms"
            value={formData.bathroom || ""}
            onChange={(e) => onChange("bathroom", e.target.value)}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            name="toilet"
            placeholder="Toilets"
            value={formData.toilet || ""}
            onChange={(e) => onChange("toilet", e.target.value)}
            className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Area Size */}
      <div>
        <h3 className="font-bold text-gray-700">Area Size</h3>
        <input
          type="text"
          name="areaSize"
          placeholder="Enter area size (e.g., 200sqm)"
          value={formData.areaSize || ""}
          onChange={(e) => onChange("areaSize", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <h3 className="font-bold text-gray-700">Description</h3>
        <textarea
          name="description"
          placeholder="Enter property description"
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />
      </div>

      {/* Features */}
      <div>
        <h3 className="font-bold text-gray-700">Features</h3>
        <div className="flex flex-wrap space-x-4">
          {featuresOptions.map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={feature}
                checked={formData.features?.includes(feature) || false}
                onChange={(e) => {
                  const selectedFeatures = formData.features || [];
                  if (e.target.checked) {
                    onChange("features", [...selectedFeatures, feature]);
                  } else {
                    onChange(
                      "features",
                      selectedFeatures.filter((f: any) => f !== feature)
                    );
                  }
                }}
                className="form-checkbox"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-bold text-gray-700">Amenities</h3>
        <div className="flex flex-wrap space-x-4">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={amenity}
                checked={formData.amenities?.includes(amenity) || false}
                onChange={(e) => {
                  const selectedAmenities = formData.amenities || [];
                  if (e.target.checked) {
                    onChange("amenities", [...selectedAmenities, amenity]);
                  } else {
                    onChange(
                      "amenities",
                      selectedAmenities.filter((a: any) => a !== amenity)
                    );
                  }
                }}
                className="form-checkbox"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
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
          onClick={onNext}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded-lg font-bold shadow-md hover:shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Details;
