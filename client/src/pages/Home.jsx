import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import EventDetails from "../components/EventDetails";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // reading state from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = Number(searchParams.get("page")) || 1;

  // fetch registered ids
  const getRegisteredIds = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/registrations/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const ids = response.data.registrations.map((item) => item.eventId._id);

      setRegisteredIds(ids);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch events
  const getEvents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/events`,
        {
          params: {
            search,
            category,
            location,
            startDate,
            endDate,
            page,
            limit: 6,
          },
        },
      );

      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
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

  // reset
  const handleReset = () => {
    setSearchParams({ page: 1 });
  };

  useEffect(() => {
    getEvents();
    getRegisteredIds();
  }, [search, category, location, startDate, endDate, page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* filter */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
          {/* Search */}
          <div className="relative w-full sm:w-48">
            <Search
              size={14}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) =>
                setSearchParams({
                  search: e.target.value,
                  category,
                  location,
                  startDate,
                  endDate,
                  page: 1,
                })
              }
              type="text"
              placeholder="Search"
              className="w-full pl-7 pr-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setSearchParams({
                search,
                category: e.target.value,
                location,
                startDate,
                endDate,
                page: 1,
              })
            }
            className="w-full sm:w-32 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Category</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
          </select>

          {/* Location */}
          <select
            value={location}
            onChange={(e) =>
              setSearchParams({
                search,
                category,
                location: e.target.value,
                startDate,
                endDate,
                page: 1,
              })
            }
            className="w-full sm:w-32 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>

          {/* Start Date */}
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setSearchParams({
                search,
                category,
                location,
                startDate: e.target.value,
                endDate,
                page: 1,
              })
            }
            className="w-full sm:w-36 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          {/* End Date */}
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setSearchParams({
                search,
                category,
                location,
                startDate,
                endDate: e.target.value,
                page: 1,
              })
            }
            className="w-full sm:w-36 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          {/* Reset */}
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs bg-gray-200 rounded-md hover:bg-gray-300 transition cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* events grid */}
        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onView={setSelectedEvent}
                  isRegistered={registeredIds.includes(event._id)}
                />
              ))}
            </div>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setSearchParams({
                      search,
                      category,
                      location,
                      startDate,
                      endDate,
                      page: page - 1,
                    })
                  }
                  className="px-3 py-1 text-xs bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSearchParams({
                        search,
                        category,
                        location,
                        startDate,
                        endDate,
                        page: i + 1,
                      })
                    }
                    className={`px-3 py-1 text-xs rounded cursor-pointer ${
                      page === i + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setSearchParams({
                      search,
                      category,
                      location,
                      startDate,
                      endDate,
                      page: page + 1,
                    })
                  }
                  className="px-3 py-1 text-xs bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* modal  */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Home;
