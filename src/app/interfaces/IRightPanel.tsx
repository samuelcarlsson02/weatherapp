export interface RightPanelProps {
  rightCity: string;
  displayTemperature: number | null;
  rightIcon: string;
  iconAlt: string;
  showButtons: boolean;
  buttonOneOnClick: () => void;
  buttonOneLabel: string;
  buttonTwoOnClick: () => void;
  buttonTwoLabel: string;
  rightCityImage?: string;
  isCorrect: boolean;
  isResetting: boolean;
  isAnimating: boolean;
}
