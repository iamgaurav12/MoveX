import React from "react";

const LocationSeachPanel = (props) => {
  const locations = [
    "Corbu House , PEC , Chandigarh-12",
    "Aravali House , PEC , Chandigarh-12",
    "Kurukshstra House , PEC , Chandigarh-12",
    "ShivaJi House , PEC , Chandigarh-12",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={function () {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSeachPanel;
