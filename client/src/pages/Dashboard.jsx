import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import RegisteredEventDetails from "../components/RegisteredEventDetails";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRegisteredEvents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/registrations/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEvents(response.data.registrations);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getRegisteredEvents();
    }
  }, [token]);

  // Categorization Logic
  const today = new Date();

  const upcomingEvents = events
    .filter((item) => new Date(item.eventId.date) >= today)
    .sort((a, b) => new Date(a.eventId.date) - new Date(b.eventId.date));

  const pastEvents = events
    .filter((item) => new Date(item.eventId.date) < today)
    .sort((a, b) => new Date(b.eventId.date) - new Date(a.eventId.date));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">My Registered Events</h1>

        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <p className="text-gray-500 text-center">
            You have not registered for any events yet.
          </p>
        ) : (
          <div className="space-y-10">
            {/* Upcoming Section */}
            <div>
              <h2 className="text-sm font-semibold mb-4">Upcoming Events</h2>

              {upcomingEvents.length === 0 ? (
                <p className="text-gray-400">No upcoming events.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((item) => (
                    <RegisteredEventDetails
                      key={item._id}
                      item={item}
                      refreshEvents={getRegisteredEvents}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Past Section */}
            <div>
              <h2 className="text-sm font-semibold mb-4">Past Events</h2>

              {pastEvents.length === 0 ? (
                <p className="text-gray-400">No past events.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((item) => (
                    <RegisteredEventDetails
                      key={item._id}
                      item={item}
                      refreshEvents={getRegisteredEvents}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
