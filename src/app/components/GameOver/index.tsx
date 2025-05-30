import React from "react";
import { GameOverProps } from "@/app/interfaces/IGameOver";
import Button from "@/app/components/Button";

const GameOver = ({
  isHighscore,
  score,
  onClick,
  buttonLabel,
}: GameOverProps) => {
  return (
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
        onClick={onClick}
        className="mt-4 bg-gradient-to-r from-green-500 to-green-700 py-4 px-10 rounded-xl shadow-lg text-white font-semibold hover:from-green-600 hover:to-green-800 hover:scale-105 cursor-pointer"
        label={buttonLabel}
      />
    </div>
  );
};
export default GameOver;
