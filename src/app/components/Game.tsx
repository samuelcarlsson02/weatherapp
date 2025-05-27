import Button from './Button';
import { useEffect, useState } from 'react';

export function Game() {
    const [isCorrect, setIsCorrect] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [isCountingUp, setIsCountingUp] = useState(false);
    const [displayTemp, setDisplayTemp] = useState<number | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [leftTemperature, setLeftTemperature] = useState(20); // Mock temperature for left city
    const [rightTemperature, setRightTemperature] = useState(25) // Mock temperature for right city

    const handleHigherClick = () => {
        const correct = leftTemperature < rightTemperature; // Mock logic

        if (correct) {
            triggerAnimation();
        }
    };

    const handleLowerClick = () => {
        const correct = leftTemperature > rightTemperature; // Mock logic

        if (correct) {
            triggerAnimation();
        }
    };

    const triggerAnimation = () => {
        setIsCorrect(true);
        setIsAnimating(true);
        setShowButtons(false);
        setIsCountingUp(true);

        setTimeout(() => {
            setIsResetting(true);
            setIsAnimating(false);
            setIsCorrect(false);
            setLeftTemperature(rightTemperature);
            setRightTemperature(Math.floor(Math.random() * 40) - 10); // Mock new temperature for right city
            setDisplayTemp(null);

            setTimeout(() => {
                setIsResetting(false);
                setShowButtons(true);
                setIsCountingUp(false);
            }, 50);
        }, 800);
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

    return (
        <div className="h-full w-full flex md:gap-4 p-4 md:flex-row flex-col overflow-hidden">
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg
                ${isResetting ? 'transition-none' : 'transition-transform duration-800 ease-in-out'}
                ${isAnimating && isCorrect ? 'transform translate-x-[114%] opacity-0' : ''}`
            }>
                <h2 className="text-2xl font-bold mb-4">City</h2>
                <p className="mb-4">temperature is</p>
                <p className="text-3xl font-bold">{leftTemperature}°C</p>
            </div>
            <div className="w-auto flex flex-col items-center justify-center m-2">
                <h2 className="text-2xl font-bold">VS</h2>
            </div>
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg
                ${isResetting ? 'transition-none' : 'transition-transform duration-800 ease-in-out'}
                ${isAnimating && isCorrect ? 'transform -translate-x-[114%]' : ''}`
            }>
                <h2 className="text-2xl font-bold mb-4">City</h2>
                <p className="mb-4">temperature is</p>
                {isCountingUp && displayTemp !== null ? (
                    <p className="text-3xl font-bold">{displayTemp}°C</p>
                ) : (
                    showButtons && (
                        <div className="flex flex-col gap-4 justify-center">
                            <Button
                                onClick={handleHigherClick}
                                className="bg-gradient-to-r from-red-500 to-red-700 py-2 px-12 rounded-xl shadow-lg text-white font-semibold hover:from-red-600 hover:to-red-800 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                label="↑ Higher"
                            />
                            <Button
                                onClick={handleLowerClick}
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