import Button from "./Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GameBoardProps } from "../interfaces/IGameBoard";
import { getCurrentWeatherFromCity } from "../pages/api/current/index";
import { getCityImage } from "../pages/api/pexels/index";

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

  const handleClick = async (direction: string) => {
    let correct = null;
    if (direction === "higher") {
      correct = leftTemperature <= rightTemperature; // Mock logic
    } else {
      correct = leftTemperature >= rightTemperature; // Mock logic
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
        setLeftCity(rightCity);
        setCurrentWeatherFromRandomCity();
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
      const crd = pos.coords;
      const cordString = crd.latitude + ", " + crd.longitude;
      const result = await getCurrentWeatherFromCity(cordString, "en");
      setLeftTemperature(result.temp_c);
      setLeftCity(result.name);
      setLeftIcon(result.icon);
    };

    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };

  const loadCityList = async () => {
    const result = await fetch("/countrys/index.txt");
    if (!result.ok) throw new Error(`HTTP ${result.status}`);
    const text = await result.text();
    const lines = text
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    setCityList(lines);

    console.log("City list loaded:", cityList);
  };

  const setCurrentWeatherFromRandomCity = async () => {
    const randomSelection = Math.floor(Math.random() * cityList.length);
    const randomCity = cityList[randomSelection];
    cityList.splice(randomSelection, 1);
    const result = await getCurrentWeatherFromCity(randomCity, "en");
    setRightTemperature(result.temp_c);
    setRightCity(result.name);
    setRightIcon(result.icon);
  };

  const setCityImages = async () => {
    const leftImage = await getCityImage(leftCity);
    console.log("Left city image:", leftImage);
    setLeftCityImage(leftImage);

    const rightImage = await getCityImage(rightCity);
    console.log("Right city image:", rightImage);
    setRightCityImage(rightImage);
  };

  useEffect(() => {
    const storedHighscore = Number(localStorage.getItem("highscore"));
    setHighscore(storedHighscore);
    loadCityList();
    currentWeatherPostion();
  }, []);

  useEffect(() => {
    if (cityList.length > 0) {
      setCurrentWeatherFromRandomCity();
    }
  }, [cityList]);

  useEffect(() => {
    if (leftCity && rightCity) {
      setCityImages();
    }
  }, [leftCity, rightCity]);

  const resetGame = () => {
    loadCityList();
    currentWeatherPostion();
    setCurrentWeatherFromRandomCity();
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
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/70 animate-fade-in">
          <p className="text-6xl font-bold font-mono text-white">GAME OVER</p>
          {isHighscore ? (
            <p className="text-2xl font-mono text-yellow-400">
              New Highscore: {score}
            </p>
          ) : (
            <p className="text-2xl font-mono text-gray-300">Score: {score}</p>
          )}
          <Button
            onClick={resetGame}
            className="mt-4 bg-gradient-to-r from-green-500 to-green-700 py-4 px-10 rounded-xl shadow-lg text-white font-semibold hover:from-green-600 hover:to-green-800 hover:scale-105 cursor-pointer"
            label="Restart Game"
          />
        </div>
      )}

      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg
                ${isResetting
            ? "transition-none"
            : "transition-transform duration-800 ease-in-out"
          }
                ${isAnimating && isCorrect
            ? "transform md:translate-x-[calc(100%+2.5rem)] md:translate-y-0 translate-y-[calc(100%+2.5rem)] opacity-0"
            : ""
          }`}
      >
        <h2 className="text-2xl font-bold mb-4">{leftCity}</h2>
        <p className="mb-4">temperature is</p>
        <p className="text-3xl font-bold">{leftTemperature}°C</p>
      </div>
      <div className="w-auto flex flex-col items-center justify-center m-2">
        <h2 className="text-2xl font-bold">VS</h2>
      </div>
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg
                ${isResetting
            ? "transition-none"
            : "transition-transform duration-800 ease-in-out"
          }
                ${isAnimating && isCorrect
            ? "transform md:-translate-x-[calc(100%+5rem)] md:-translate-y-0 -translate-y-[calc(100%+3rem)]"
            : ""
          }`}
      >
        <h2 className="text-2xl font-bold mb-4">{rightCity}</h2>
        <p className="mb-4">temperature is</p>
        {displayTemp !== null ? (
          <p className="text-3xl font-bold">{displayTemp}°C</p>
        ) : (
          showButtons && (
            <div className="flex flex-col gap-4 justify-center">
              <Button
                onClick={() => handleClick("higher")}
                className="bg-gradient-to-r from-red-500 to-red-700 py-2 px-12 rounded-xl shadow-lg text-white font-semibold hover:from-red-600 hover:to-red-800 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                label="↑ Higher"
              />
              <Button
                onClick={() => handleClick("lower")}
                className="bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-12 rounded-xl shadow-lg text-white font-semibold hover:from-blue-600 hover:to-blue-800 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                label="↓ Lower"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
