import React from "react";
import City from "../City";

interface SearchResultsProps {
  cities: {
    name: string;
    country: string;
    region: string;
    url: string;
  }[];
  clickCity: (url: string) => void;
}

const SearchResults = ({ cities, clickCity }: SearchResultsProps) => {
  return (
    <div className="results">
      {cities &&
        cities.map((city) => (
          <div key={city.url} className={""}>
            <City city={city} onClick={clickCity} />
            <hr />
          </div>
        ))}
    </div>
  );
};
export default SearchResults;
