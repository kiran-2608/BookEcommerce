import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Events({ darkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const isMobile = window.innerWidth <= 768;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/events"
      );

      setEvents(
        res.data.events.map((event) => ({
          ...event,
          registered: event.registered || 0
        }))
      );
    } catch (error) {
      toast.error("Unable to load events");
    }
  };

  // OPEN MODAL
  const openModal = (title) => {
    setSelectedEvent(title);
    setShowModal(true);
  };

  // REGISTER
  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/register-event",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            ...formData,
            event: selectedEvent
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        toast.success(
          "Successfully Registered 🎉"
        );

        // Only current session
        setRegisteredEvents((prev) => [
          ...prev,
          selectedEvent
        ]);

        // Increase registration count
        setEvents((prev) =>
          prev.map((event) =>
            event.title === selectedEvent
              ? {
                  ...event,
                  registered:
                    event.registered + 1
                }
              : event
          )
        );

        setShowModal(false);

        setFormData({
          name: "",
          email: "",
          phone: ""
        });

      } else {
        toast.error(
          "Registration failed"
        );
      }

    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = (
    eventTitle
  ) => {
    return registeredEvents.includes(
      eventTitle
    );
  };

  return (
    <div
      style={{
        background: darkMode
          ? "#111827"
          : "#f5f5f5",
        minHeight: "100vh",
        padding: isMobile
          ? "15px"
          : "30px"
      }}
    >

      {/* HERO */}

      <div
        style={{
          background:
            "linear-gradient(90deg,#6a11cb,#2575fc)",
          borderRadius: "20px",
          padding: isMobile
            ? "25px"
            : "50px",
          textAlign: "center",
          color: "white",
          marginBottom: "40px"
        }}
      >
        <h1>
          📚 Upcoming Book Events
        </h1>

        <p>
          Discover exciting literary events
        </p>
      </div>

      {/* EVENT GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            isMobile
              ? "1fr"
              : "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px"
        }}
      >
        {events.map((event) => {

          const disabled =
            isRegistered(
              event.title
            );

          return (
            <div
              key={event._id}
              style={{
                background:
                  darkMode
                    ? "#1f2937"
                    : "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >

              <img
                src={event.image}
                alt=""
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover"
                }}
              />

              <div
                style={{
                  padding: "20px"
                }}
              >

                <h2
                  style={{
                    color:
                      darkMode
                        ? "white"
                        : "#111"
                  }}
                >
                  {event.title}
                </h2>

                <p>{event.description}</p>

                <p>📅 {event.date}</p>

                <p>🕒 {event.time}</p>

                <p>📍 {event.location}</p>

                <p>
                  👥 {event.registered}
                  {" "}Registered
                </p>

                <button
                  disabled={disabled}
                  onClick={() =>
                    openModal(
                      event.title
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor:
                      disabled
                        ? "not-allowed"
                        : "pointer",
                    background:
                      disabled
                        ? "#6b7280"
                        : "linear-gradient(90deg,#6a11cb,#2575fc)"
                  }}
                >
                  {disabled
                    ? "Already Registered"
                    : "Register Now"}
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,.6)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center"
          }}
        >
          <div
            style={{
              width:
                isMobile
                  ? "90%"
                  : "400px",
              background:
                darkMode
                  ? "#1f2937"
                  : "white",
              padding: "25px",
              borderRadius:
                "15px"
            }}
          >

            <h2>
              Register for{" "}
              {selectedEvent}
            </h2>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  name:e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  email:e.target.value
                })
              }
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  phone:e.target.value
                })
              }
              style={inputStyle}
            />

            <button
              onClick={
                handleRegister
              }
              style={{
                width:"100%",
                padding:"12px",
                background:"#6a11cb",
                color:"white",
                border:"none",
                borderRadius:"10px"
              }}
            >
              {loading
                ? "Registering..."
                : "Submit"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"1px solid #ccc",
  boxSizing:"border-box"
};

export default Events;