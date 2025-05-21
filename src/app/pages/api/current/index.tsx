export const getCurrentWeatherFromCity = async (
  searchTerm: string,
  lan: string
) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?q=${searchTerm}&lang=${lan}&key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
