import React from "react";
import { CurrentResultProps } from "@/app/interfaces/ICurrentResult";

const CurrentResult = ({ currentWeather }: CurrentResultProps) => {
  const windMS = (currentWeather.wind_kph / 3.6).toFixed(1);
  const gustMS = (currentWeather.gust_kph / 3.6).toFixed(1);

  if (!currentWeather) {
    return <div className="text-center">No weather data available</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:text-black rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold">
        {currentWeather.name}, {currentWeather.region}, {currentWeather.country}
      </h2>

      <div className="flex items-center gap-2">
        <img src={currentWeather.icon} alt={currentWeather.conditionText} />
        <span className="capitalize">{currentWeather.conditionText}</span>
      </div>

      <ul className="space-y-1">
        <li>
          Temperature: {currentWeather.temp_c}°C (feels like{" "}
          {currentWeather.feelslike_c}°C)
        </li>
        <li>
          Wind: {windMS} m/s (gusts up to {gustMS} m/s)
        </li>
        <li>Humidity: {currentWeather.humidity}%</li>
        <li>UV Index: {currentWeather.uv}</li>
        <li>Visibility: {currentWeather.vis_km} km</li>
        <li>Last updated: {currentWeather.last_updated}</li>
      </ul>
    </div>
  );
};
export default CurrentResult;
