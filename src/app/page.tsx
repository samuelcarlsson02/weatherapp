"use client";
import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { getCitySuggestions } from "./pages/api/search/index";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchTerm: string) => {
    const result = await getCitySuggestions(searchTerm);
    setSearchResult(result);
    console.log(result);
  };

  useEffect(() => {
    if (searchTerm.length > 1) {
      handleSearch(searchTerm);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  const clickCity = (url: string) => {
    console.log("City clicked:", url);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Sök väder</h1>
          <InputField
            placeholder="Sök..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <SearchResults cities={searchResult} clickCity={clickCity} />
        </div>
      </main>
    </div>
  );
}
