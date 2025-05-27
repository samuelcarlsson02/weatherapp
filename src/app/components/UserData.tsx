export function UserData() {
    return (
        <div className="flex justify-between gap-2 m-4 mb-0 p-4 bg-blue-300 dark:bg-blue-950 rounded-lg shadow-lg">
            <div className="flex flex-col">
                <h3 className="text-xl">Highscore</h3>
                <h3 className="font-bold text-xl">10</h3>
            </div>
            <div className="flex flex-col">
                <h3 className="text-xl">Score</h3>
                <h3 className="font-bold text-xl flex justify-end">0</h3>
            </div>
        </div>
    );
}