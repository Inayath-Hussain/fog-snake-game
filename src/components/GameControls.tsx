interface Iprops {
    startGame: () => void
    stopGame: () => void
    isGameRunning: boolean
    score: number
}


const GameControls: React.FC<Iprops> = ({ isGameRunning, startGame, stopGame, score }) => {
    return (
        <div className="flex flex-row justify-center items-center gap-8 mt-6">

            {
                isGameRunning ?
                    <button onClick={stopGame}
                        className="bg-amber-600 py-2 px-5 rounded-xl font-medium">Stop</button>

                    :

                    <button onClick={startGame}
                        className="bg-cyan-500 py-2 px-5 rounded-xl font-medium">Start</button>
            }


            <p className="py-2 px-7 text-xl text-white bg-black">{score}</p>

        </div>
    );
}

export default GameControls;