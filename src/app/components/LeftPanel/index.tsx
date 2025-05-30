import React from "react";
import { LeftPanelProps } from "@/app/interfaces/ILeftPanel";

const LeftPanel = ({
  leftCity,
  leftTemperature,
  leftIcon,
  iconAlt,
}: LeftPanelProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-black/40 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{leftCity}</h2>
      <p className="">temperature is</p>
      <div className="flex items-center justify-center">
        {leftIcon !== "" && <img src={leftIcon} alt={iconAlt}></img>}
        <p className="text-3xl font-bold">{leftTemperature}°C</p>
      </div>
    </div>
  );
};
export default LeftPanel;
