import React, { useEffect, useState, useContext, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapUpdater = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, map.getZoom());
    }
  }, [location, map]);
  return null;
};

const LiveTracking = ({ pickup, destination }) => {
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        socket.emit("updateLocation", newLocation);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [socket]);

  useEffect(() => {
    socket.on("locationUpdate", (newLocation) => {
      setLocation(newLocation);
    });

    return () => socket.off("locationUpdate");
  }, [socket]);

  useEffect(() => {
    if (!pickup || !destination || !pickup.lat || !pickup.lng || !destination.lat || !destination.lng) return;
  
    const map = document.querySelector(".leaflet-container")?._leaflet_id
      ? null
      : L.map("map");

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [pickup, destination]);

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <MapUpdater location={location} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location} icon={markerIcon}>
        <Popup>Your live location</Popup>
      </Marker>
      {captain?.location && (
        <Marker position={captain.location} icon={markerIcon}>
          <Popup>Captain's Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default LiveTracking;
