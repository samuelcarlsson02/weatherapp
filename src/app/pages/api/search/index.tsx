export const getCitySuggestions = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?q=${searchTerm}&key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
