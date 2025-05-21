import React from "react";
import { CityProps } from "@/app/interfaces/ICity";

const City = ({ city, onClick }: CityProps) => {
  return (
    <div
      className={"flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md"}
      onClick={() => onClick(city.url)}
    >
      <h3>{city.name}</h3>
      <p>
        {city.country}, {city.region}
      </p>
    </div>
  );
};
export default City;
