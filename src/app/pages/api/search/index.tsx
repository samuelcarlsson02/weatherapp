export const getCitySuggestions = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${searchTerm}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
