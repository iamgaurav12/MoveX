import React, { useRef, useState } from "react";
import uberMap from "../assets/uber-map.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSeachPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelContentRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
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

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-700x394.png"
        alt="uber-logo"
      />
      <div className="h-screen w-screen">
        {/* Temporary image */}
        <img className="h-full w-full object-cover" src={uberMap} alt="" />
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
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter your destination"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSeachPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
