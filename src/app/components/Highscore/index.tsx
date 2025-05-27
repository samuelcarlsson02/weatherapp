import React, { useEffect, useState } from "react";

const highScore_Key = "highScore";
const Highscore: React.FC = () => {
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem(highScore_Key);
    if (storedHighScore && !isNaN(Number(storedHighScore))) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem(highScore_Key, newScore.toString());
    }
  };

  return (
    <div className="highscore">
      <h2>High Score</h2>
      <p>{highScore}</p>
    </div>
  );
};

export default Highscore;
