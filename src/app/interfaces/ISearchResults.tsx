export interface SearchResultsProps {
  cities: {
    name: string;
    country: string;
    region: string;
    url: string;
  }[];
  clickCity: (url: string) => void;
}
