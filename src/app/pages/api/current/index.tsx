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

  const data = await response.json();

  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,

    icon: data.current.condition.icon,
    conditionText: data.current.condition.text,

    temp_c: data.current.temp_c,
    feelslike_c: data.current.feelslike_c,
    wind_kph: data.current.wind_kph,
    gust_kph: data.current.gust_kph,
    humidity: data.current.humidity,
    uv: data.current.uv,
    vis_km: data.current.vis_km,
    last_updated: data.current.last_updated,
  };
};
