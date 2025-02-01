import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Captain Marker Icon
const captainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Component to update map center on location change
const LocationUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
};

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const [location, setLocation] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);

            socket.emit("update-location-captain", {
              userId: captain._id,
              location: { ltd: latitude, lng: longitude },
            });
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [socket, captain]);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanel]);

  async function confirmRide() {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  return (
    <div className="h-screen relative">
      {/* ✅ FIX: Keep the Header Visible (Higher z-index) */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between p-6 z-20 bg-transparent">
        <img
          className="w-16 ml-5"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-700x394.png"
          alt="uber-logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* ✅ FIX: Ensure Map Doesn't Cover Header */}
      <div className="h-3/5 relative z-10">
        {location ? (
          <MapContainer
            center={location}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} icon={captainIcon} />
            <LocationUpdater position={location} />
          </MapContainer>
        ) : (
          <p className="text-center">Loading your location...</p>
        )}
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Request Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full bottom-0 bg-white z-10 translate-y-full px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      {/* Ride Confirmation Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen bottom-0 bg-white z-10 translate-y-full px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
