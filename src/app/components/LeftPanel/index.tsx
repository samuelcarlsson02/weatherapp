import React from "react";
import Image from "next/image";
import { LeftPanelProps } from "@/app/interfaces/ILeftPanel";

const LeftPanel = ({
  leftCity,
  leftTemperature,
  leftIcon,
  iconAlt,
  leftCityImage,
  isResetting,
  isCorrect,
  isAnimating,
}: LeftPanelProps) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg
                    ${
                      isResetting
                        ? "transition-none"
                        : "transition-transform duration-800 ease-in-out"
                    }
                    ${
                      isAnimating && isCorrect
                        ? "transform md:translate-x-[calc(100%+2.5rem)] md:translate-y-0 translate-y-[calc(100%+2.5rem)] opacity-0"
                        : ""
                    }`}
    >
      {leftCityImage && (
        <Image
          src={leftCityImage}
          alt={leftCity}
          fill
          className="object-cover w-full h-full rounded-lg"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-black/40 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{leftCity}</h2>
        <p className="">temperature is</p>
        <div className="flex items-center justify-center">
          {leftIcon !== "" && <img src={leftIcon} alt={iconAlt}></img>}
          <p className="text-3xl font-bold">{leftTemperature}°C</p>
        </div>
      </div>
    </div>
  );
};
export default LeftPanel;
