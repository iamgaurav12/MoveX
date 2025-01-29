import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-[93%] absolute top-0 "
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
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
        <div className="mt-10 w-full">
          <Link
            to="/captain-home"
            className=" mt-5 w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg "
          >
            Finish Ride
          </Link>
          <p className=" mt-10 text-xs ">
            -  Click on "Finish Ride" if you completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
