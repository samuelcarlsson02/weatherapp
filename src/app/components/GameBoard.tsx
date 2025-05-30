import { useEffect, useState } from "react";
import Image from "next/image";
import { GameBoardProps } from "../interfaces/IGameBoard";
import { getCurrentWeatherFromCity } from "../pages/api/current/index";
import { getCityImage } from "../pages/api/pexels/index";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import GameOver from "./GameOver";

export function GameBoard({
  score,
  setScore,
  highscore,
  setHighscore,
}: GameBoardProps) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [isCountingUp, setIsCountingUp] = useState(false);
  const [displayTemp, setDisplayTemp] = useState<number | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [leftTemperature, setLeftTemperature] = useState(0);
  const [rightTemperature, setRightTemperature] = useState(0);
  const [leftCity, setLeftCity] = useState("");
  const [rightCity, setRightCity] = useState("");
  const [rightIcon, setRightIcon] = useState("");
  const [leftIcon, setLeftIcon] = useState("");
  const [answerResult, setAnswerResult] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [gameOver, setGameOver] = useState(false);
  const [isHighscore, setIsHighscore] = useState(false);
  const [cityList, setCityList] = useState<string[]>([]);
  const [leftCityImage, setLeftCityImage] = useState("");
  const [rightCityImage, setRightCityImage] = useState("");
  const [geoBlock, setGeoBlock] = useState<boolean | null>(null);

  const handleClick = async (direction: string) => {
    let correct = null;
    if (direction === "higher") {
      correct = leftTemperature <= rightTemperature;
    } else {
      correct = leftTemperature >= rightTemperature;
    }

    await triggerCountdownAnimation();

    if (correct) {
      setAnswerResult("correct");

      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highscore) {
        setHighscore(newScore);
        localStorage.setItem("highscore", String(newScore));
        setIsHighscore(true);
      }

      await timeoutAnswerResult();
      await triggerSlideAnimation();
    } else {
      setAnswerResult("incorrect");
      await timeoutAnswerResult();
      setGameOver(true);
    }
  };

  const timeoutAnswerResult = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAnswerResult(null);
        resolve(true);
      }, 1200);
    });
  };

  const triggerCountdownAnimation = async () => {
    return new Promise((resolve) => {
      setIsCountingUp(true);

      setTimeout(() => {
        setIsCountingUp(false);
        resolve(true);
      }, 2000);
    });
  };

  const triggerSlideAnimation = async () => {
    return new Promise((resolve) => {
      setIsCorrect(true);
      setIsAnimating(true);
      setShowButtons(false);

      setTimeout(() => {
        setIsResetting(true);
        setIsAnimating(false);
        setIsCorrect(false);
        setLeftTemperature(rightTemperature);
        setLeftIcon(rightIcon);
        setLeftCity(rightCity);
        setLeftCityImage(rightCityImage);
        setRightCity("");
        setRightCityImage("");
        setCurrentWeatherFromRandomCity("right");
        setDisplayTemp(null);
        setAnswerResult(null);
        resolve(true);

        setTimeout(() => {
          setIsResetting(false);
          setShowButtons(true);
        }, 50);
      }, 800);
    });
  };

  useEffect(() => {
    if (isCountingUp) {
      const duration = 600;
      const steps = 30;
      const increment = rightTemperature / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const currentTemperature = Math.round(increment * currentStep);

        if (currentStep >= steps) {
          setDisplayTemp(rightTemperature);
          clearInterval(timer);
        } else {
          setDisplayTemp(currentTemperature);
        }
      }, stepDuration);
      return () => clearInterval(timer);
    }
  }, [isCountingUp, rightTemperature]);

  const currentWeatherPostion = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos: GeolocationPosition) => {
      setGeoBlock(false);
      const crd = pos.coords;
      const cordString = crd.latitude + ", " + crd.longitude;
      const result = await getCurrentWeatherFromCity(cordString, "en");
      setLeftTemperature(result.temp_c);
      setLeftCity(result.name);
      setLeftIcon(result.icon);
    };

    const error = (err: GeolocationPositionError) => {
      setGeoBlock(true);
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const loadCityList = async () => {
    const result = await fetch("/countries/index.txt");
    if (!result.ok) throw new Error(`HTTP ${result.status}`);
    const text = await result.text();
    const lines = text
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    setCityList(lines);

    console.log("City list loaded:", cityList);
  };

  const setCurrentWeatherFromRandomCity = async (panel: string) => {
    const randomSelection = Math.floor(Math.random() * cityList.length);
    const randomCity = cityList[randomSelection];
    cityList.splice(randomSelection, 1);
    const result = await getCurrentWeatherFromCity(randomCity, "en");
    if (panel === "left") {
      setLeftTemperature(result.temp_c);
      setLeftCity(result.name);
      setLeftIcon(result.icon);
    } else {
      setRightTemperature(result.temp_c);
      setRightCity(result.name);
      setRightIcon(result.icon);
    }
  };

  const changeRightCityImage = async () => {
    const rightImage = await getCityImage(rightCity);
    setRightCityImage(rightImage);
  };

  const changeLeftCityImage = async () => {
    const leftImage = await getCityImage(leftCity);
    setLeftCityImage(leftImage);
  };

  useEffect(() => {
    const storedHighscore = Number(localStorage.getItem("highscore"));
    setHighscore(storedHighscore);
    loadCityList();
    currentWeatherPostion();
  }, []);

  useEffect(() => {
    if (cityList.length > 0) {
      setCurrentWeatherFromRandomCity("right");
    }
  }, [cityList]);

  useEffect(() => {
    if (geoBlock) {
      setCurrentWeatherFromRandomCity("left");
    }
  }, [geoBlock]);

  useEffect(() => {
    if (rightCity) {
      changeRightCityImage();
    }
  }, [rightCity]);

  useEffect(() => {
    if (leftCity) {
      changeLeftCityImage();
    }
  }, [leftCity]);

  const resetGame = () => {
    setRightCityImage("");
    setLeftCityImage("");
    setLeftCity("");
    setRightCity("");
    loadCityList();
    currentWeatherPostion();
    setCurrentWeatherFromRandomCity("right");
    setDisplayTemp(null);
    setIsCorrect(false);
    setIsAnimating(false);
    setShowButtons(true);
    setIsResetting(false);
    setGameOver(false);
    setScore(0);
    setIsHighscore(false);
  };

  return (
    <div className="h-full w-full flex md:gap-4 p-4 md:flex-row flex-col overflow-hidden">
      {geoBlock === null && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 animate-fade-in"></div>
      )}
      {answerResult && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 animate-fade-in">
          <Image
            src={
              answerResult === "correct"
                ? "/images/correct.png"
                : "/images/incorrect.png"
            }
            alt={answerResult === "correct" ? "Correct!" : "Incorrect!"}
            width={200}
            height={200}
            className="drop-shadow-lg animate-pulse"
          />
        </div>
      )}

      {gameOver && (
        <GameOver
          isHighscore={isHighscore}
          score={score}
          onClick={resetGame}
          buttonLabel="Restart Game"
        />
      )}
      <LeftPanel
        leftCity={leftCity}
        leftTemperature={leftTemperature}
        leftIcon={leftIcon}
        iconAlt="Left weather icon"
        leftCityImage={leftCityImage}
        isCorrect={isCorrect}
        isResetting={isResetting}
        isAnimating={isAnimating}
      />

      <div className="w-auto flex flex-col items-center justify-center m-2">
        <h2 className="text-2xl font-bold">VS</h2>
      </div>

      <RightPanel
        rightCity={rightCity}
        displayTemperature={displayTemp}
        rightIcon={rightIcon}
        iconAlt="Right weather icon"
        showButtons={showButtons}
        buttonOneOnClick={() => handleClick("higher")}
        buttonOneLabel="↑ Higher"
        buttonTwoOnClick={() => handleClick("lower")}
        buttonTwoLabel="↓ Lower"
        rightCityImage={rightCityImage}
        isCorrect={isCorrect}
        isResetting={isResetting}
        isAnimating={isAnimating}
      />
    </div>
  );
}
