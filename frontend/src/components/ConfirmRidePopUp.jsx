import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [OTP, setOTP] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0 "
        onClick={() => props.setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src="https://imgs.search.brave.com/YloJzM-H9O2GuIG27oWtGrle-n6Fiweuj-XxUIqG3_s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzAyLzlk/L2Y4LzAyOWRmODBm/ODczMzZkOTA1NDRi/NmRmMjVmNTEzZDQ2/LmpwZw"
            alt="captain-image"
          />
          <h2 className="text-lg font-medium">Jasleen Kaur</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
                Kankariya Talab , Ahemdabad
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">
                Kankariya Talab , Ahemdabad
              </p>
            </div>
          </div>
        </div>
        <form></form>
        <div className="mt-6 w-full">
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mb-3"
              type="text"
              placeholder="Enter OTP"
              value={OTP}
              onChange={(e)=>setOTP(e.target.value)}
            />
            <Link
              to="/captain-riding"
              className=" mt-5 w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg "
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className=" mt-1 w-full text-lg bg-red-600 text-white font-semibold p-3 rounded-lg "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
