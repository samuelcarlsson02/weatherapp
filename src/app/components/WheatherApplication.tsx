import { ReactNode } from "react";

export function WheatherApplication({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col font-sans h-screen">
            <div className="flex flex-col h-full w-full max-w-screen-2xl mx-auto m-2">
                <h1 className="font-mono text-3xl font-bold pl-4 flex justify-center">Wheather Game</h1>
                {children}
            </div>
        </div>
    );
}