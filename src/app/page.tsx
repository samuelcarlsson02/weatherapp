"use client";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import CurrentResult from "./components/CurrentResult";
import SearchResults from "./components/SearchResults";
import { getCitySuggestions } from "./pages/api/search/index";
import { getCurrentWeatherFromCity } from "./pages/api/current/index";
import { ICurrentResult } from "@/app/interfaces/ICurrentResult";

type Window = "landing" | "search" | "result";

export default function Home() {
  const [window, setWindow] = useState<Window>("landing");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCity, setSelectedCity] = useState<ICurrentResult | null>(null);
  const [currentCompare, setCurrentCompare] = useState<ICurrentResult | null>(
    null
  );
  const [otherCompare, setOtherCompare] = useState<ICurrentResult | null>(null);
  const [cityList, setCityList] = useState<string[]>([]);

  const handleSearch = async (searchTerm: string) => {
    const result = await getCitySuggestions(searchTerm);
    setSearchResult(result);
  };

  const currentWeatherPostion = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos: GeolocationPosition) => {
      const crd = pos.coords;
      const cordString = crd.latitude + ", " + crd.longitude;
      const result = await getCurrentWeatherFromCity(cordString, "en");
      setCurrentCompare(result);
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const loadCityList = async () => {
    const result = await fetch("/countrys/index.txt");
    if (!result.ok) throw new Error(`HTTP ${result.status}`);
    const text = await result.text();
    const lines = text
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    setCityList(lines);

    console.log("City list loaded:", cityList);
  };

  const setCurrentWeatherFromRandomCity = async () => {
    const randomCity = cityList[Math.floor(Math.random() * cityList.length)];
    const result = await getCurrentWeatherFromCity(randomCity, "en");
    setOtherCompare(result);
  };

  useEffect(() => {
    loadCityList();
  }, []);
  useEffect(() => {
    if (cityList.length > 0) {
      setCurrentWeatherFromRandomCity();
    }
  }, [cityList]);

  useEffect(() => {
    currentWeatherPostion();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      handleSearch(searchTerm);
    } else {
      setSearchResult([]);
    }
  }, [window, searchTerm]);

  const startSearch = () => setWindow("search");

  const clickCityInList = async (query: string) => {
    const result = await getCurrentWeatherFromCity(query, "en");
    setSelectedCity(result);
    setWindow("result");
  };

  const backToSearch = () => {
    setSelectedCity(null);
    setSearchTerm("");
    setSearchResult([]);
    setWindow("search");
  };

  const backToLanding = () => {
    setSearchTerm("");
    setSearchResult([]);
    setSelectedCity(null);
    setWindow("landing");
  };

  const temperorary = () => {};

  if (window === "landing") {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-6 items-center">
          <h1 className="text-5xl font-bold">Välkommen</h1>
          <div className="flex flex-row gap-4">
            <Button
              onClick={loadCityList}
              className="bg-gradient-to-r from-red-500 to-red-700 py-2 px-6 rounded-xl shadow-lg text-white font-semibold hover:from-red-600 hover:to-red-800 hover:scale-105 cursor-pointer"
              label="Högre"
            />
            <Button
              onClick={temperorary}
              className="bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-6 rounded-xl shadow-lg text-white font-semibold hover:from-blue-600 hover:to-blue-800 hover:scale-105 cursor-pointer"
              label="Lägre"
            />
          </div>
          <h2>
            {currentCompare?.country}: {currentCompare?.temp_c}°C
          </h2>
          <h2>
            {otherCompare?.country}: {otherCompare?.temp_c}°C
          </h2>
          <Button onClick={startSearch} className="" label="Sök väder" />
        </main>
      </div>
    );
  }

  if (window === "search") {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Sök väder</h1>
            <InputField
              placeholder="Sök..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <SearchResults cities={searchResult} clickCity={clickCityInList} />
            <Button
              onClick={backToLanding}
              className="mt-4 text-blue-500 underline"
              label="Tillbaka"
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Väder</h1>
          <Button
            onClick={backToSearch}
            className="text-blue-500 underline"
            label="Tillbaka till sök"
          />
          <CurrentResult currentWeather={selectedCity!} />
        </div>
      </main>
    </div>
  );
}
