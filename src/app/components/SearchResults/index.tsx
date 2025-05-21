import React from "react";
import City from "../City";
import { SearchResultsProps } from "@/app/interfaces/ISearchResults";

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
