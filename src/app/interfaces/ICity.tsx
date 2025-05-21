export interface City {
  name: string;
  country: string;
  region: string;
  url: string;
}

export interface CityProps {
  city: City;
  onClick: (url: string) => void;
}
