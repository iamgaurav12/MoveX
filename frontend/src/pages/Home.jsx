import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelContentRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingforDriver, setWaitingForDriver] = useState(false);
  const waitingforDriverRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setWaitingForDriver(true);
    setVehicleFound(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    setActiveField("pickup");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data.results);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setActiveField("destination");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data.results);
    } catch {
      // handle error
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelContentRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
        });
        gsap.to(panelContentRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingforDriver) {
        gsap.to(waitingforDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingforDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingforDriver]
  );

  async function findTrip() {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination!");
      return;
    }

    setVehiclePanel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Fare data:", response.data);
      setFare(response.data);

      // Update LiveTracking with pickup and destination
      setRide({ pickup, destination });
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-700x394.png"
        alt="uber-logo"
      />
      <div className="h-screen w-screen relative">
        <div className="absolute inset-0 z-0">
          <LiveTracking pickup={pickup} destination={destination} />
        </div>
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] relative p-5 bg-white ">
          <h5
            ref={panelContentRef}
            onClick={() => setPanelOpen(false)}
            className="absolute right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-black"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3"
              type="text"
              placeholder="Add a pickup location"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter your destination"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        className="fixed w-full bottom-0 bg-white translate-y-full z-10 px-3 py-10 pt-12"
        ref={vehiclePanelRef}
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      <div
        className="fixed w-full bottom-0 bg-white translate-y-full z-10 px-3 py-6 pt-12"
        ref={confirmRidePanelRef}
      >
        <ConfirmRide
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bottom-0 bg-white translate-y-full z-10 px-3 py-6 pt-12"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingforDriverRef}
        className="fixed w-full bottom-0 bg-white translate-y-full z-10 px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingforDriver}
        />
      </div>
    </div>
  );
};

export default Home;
