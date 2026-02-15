import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

const EventCard = ({ event, onView, isRegistered }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
      {/* Category */}
      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
        {event.category}
      </span>

      {isRegistered && (
        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          Registered
        </span>
      )}

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2">
        {event.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <MapPin size={16} />
        <span>{event.location}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <Calendar size={16} />
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Users size={16} />
        <span>{event.capacity} seats left</span>
      </div>

      {isRegistered ? (
        <button
          disabled
          className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
        >
          Already Registered
        </button>
      ) : (
        <button
          onClick={() => onView(event)}
          className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default EventCard;
