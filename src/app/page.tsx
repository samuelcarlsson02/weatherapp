"use client";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import CurrentResult from "./components/CurrentResult";
import SearchResults from "./components/SearchResults";
import { getCitySuggestions } from "./pages/api/search/index";
import { getCurrentWeatherFromCity } from "./pages/api/current/index";
import { ICurrentResult } from "@/app/interfaces/ICurrentResult";
import { WheatherApplication } from "./components/WeatherApplication";
import { GameBoard } from "./components/GameBoard";
import { UserData } from "./components/UserData";

type Window = "landing" | "search" | "result";

export default function Home() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [window, setWindow] = useState<Window>("landing");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCity, setSelectedCity] = useState<ICurrentResult | null>(null);

  const handleSearch = async (searchTerm: string) => {
    const result = await getCitySuggestions(searchTerm);
    setSearchResult(result);
  };

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
      <WheatherApplication>
        <UserData score={score} highscore={highscore} />
        <GameBoard
          score={score}
          setScore={setScore}
          highscore={highscore}
          setHighscore={setHighscore}
        />
      </WheatherApplication>
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
