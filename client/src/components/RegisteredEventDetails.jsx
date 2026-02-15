import axios from "axios";
import { Calendar, MapPin } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const RegisteredEventDetails = ({ item, refreshEvents }) => {
  const { token } = useContext(AuthContext);

  const handleCancel = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/registrations/${item.eventId._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data.message);
      refreshEvents(); //refetch after cancel
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <>
      <div
        key={item._id}
        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold mb-2">{item.eventId.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <MapPin size={16} />
          {item.eventId.location}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Calendar size={16} />
          {new Date(item.eventId.date).toLocaleDateString()}
        </div>

        <button
          onClick={() => handleCancel(item.eventId._id)}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          Cancel Registration
        </button>
      </div>
    </>
  );
};

export default RegisteredEventDetails;
