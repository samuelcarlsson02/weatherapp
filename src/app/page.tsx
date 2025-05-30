"use client";
import { useState } from "react";
import { WheatherApplication } from "./components/WheatherApplication";
import { GameBoard } from "./components/GameBoard";
import { UserData } from "./components/UserData";

export default function Home() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  return (
    <WheatherApplication>
      <UserData score={score} highscore={highscore} />
      <GameBoard
        score={score}
        setScore={setScore}
        highscore={highscore}
        setHighscore={setHighscore}
      />
    </WheatherApplication>
  );
}
