import React from "react";
import Image from "next/image";
import { RightPanelProps } from "@/app/interfaces/IRightPanel";
import Button from "@/app/components/Button";

const LeftPanel = ({
  rightCity,
  displayTemperature,
  rightIcon,
  iconAlt,
  showButtons,
  buttonOneOnClick,
  buttonOneLabel,
  buttonTwoOnClick,
  buttonTwoLabel,
  rightCityImage,
  isCorrect,
  isResetting,
  isAnimating,
}: RightPanelProps) => {
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
                        ? "transform md:-translate-x-[calc(100%+5rem)] md:-translate-y-0 -translate-y-[calc(100%+3rem)]"
                        : ""
                    }`}
    >
      {rightCityImage && (
        <Image
          src={rightCityImage}
          alt={rightCity}
          fill
          className="object-cover w-full h-full rounded-lg"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-black/40 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{rightCity}</h2>
        <p className="mb-4">temperature is</p>
        {displayTemperature !== null ? (
          <div className="flex items-center justify-center">
            {rightIcon !== "" && <img src={rightIcon} alt={iconAlt}></img>}
            <p className="text-3xl font-bold">{displayTemperature}°C</p>
          </div>
        ) : (
          showButtons && (
            <div className="flex flex-col gap-4 justify-center">
              <Button
                onClick={buttonOneOnClick}
                className="bg-gradient-to-r from-red-500 to-red-700 py-2 px-12 rounded-xl shadow-lg text-white font-semibold hover:from-red-600 hover:to-red-800 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                label={buttonOneLabel}
              />
              <Button
                onClick={buttonTwoOnClick}
                className="bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-12 rounded-xl shadow-lg text-white font-semibold hover:from-blue-600 hover:to-blue-800 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                label={buttonTwoLabel}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default LeftPanel;
