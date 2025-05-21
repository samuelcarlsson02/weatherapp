import React from "react";

interface City {
  name: string;
  country: string;
  region: string;
  url: string;
}

interface CityProps {
  city: City;
  onClick: (url: string) => void;
}

const City = ({ city, onClick }: CityProps) => {
  return (
    <div className={""} onClick={() => onClick(city.url)}>
      <h3>{city.name}</h3>
      <p>
        {city.country}, {city.region}
      </p>
    </div>
  );
};
export default City;
