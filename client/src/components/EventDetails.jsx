import React, { useContext } from "react";
import { X, Calendar, MapPin, Users, User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EventDetails = ({ event, onClose }) => {
  if (!event) return null;
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleEventRegistration = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/registrations/${event._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);
      onClose();
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Category */}
        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          {event.category}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-6">
          {event.name}
        </h2>

        {/* Organizer */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <User size={18} />
          <span>{event.organizer}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPin size={18} />
          <span>{event.location}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Calendar size={18} />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <Users size={18} />
          <span>{event.capacity} seats remaining</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">{event.description}</p>

        {/* Register Button */}
        {event.capacity > 0 ? (
          <button
            onClick={handleEventRegistration}
            className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Register Now
          </button>
        ) : (
          <button className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
