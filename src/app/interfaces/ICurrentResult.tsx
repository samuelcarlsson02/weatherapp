export interface ICurrentResult {
  name: string;
  country: string;
  region: string;
  icon: string;
  conditionText: string;
  wind_kph: number;
  gust_kph: number;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  last_updated: string;
  uv: number;
  vis_km: number;
}

export interface CurrentResultProps {
  currentWeather: ICurrentResult;
}
