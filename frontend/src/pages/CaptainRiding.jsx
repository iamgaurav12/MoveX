import React, { useRef, useState } from "react";
import uberMap from "../assets/uber-map1.jpg";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full z-10">
        <img
          className="w-16 ml-5"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-700x394.png"
          alt="uber-logo"
        />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img className="h-full w-full object-cover" src={uberMap} alt="" />
      </div>

      <div className="h-1/5 p-6 pt-10 bg-yellow-400 flex relative items-center justify-between" onClick={()=> setFinishRidePanel(true)}>
        <h5
          className="p-1  text-center w-[90%] absolute top-0 "
          onClick={() => {}}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 Km Away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg ">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full bottom-0 bg-white z-10 translate-y-full px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
