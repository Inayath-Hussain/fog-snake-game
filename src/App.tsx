import { useState } from "react"
import Board from "./components/Board"
import GameControls from "./components/GameControls"
import Header from "./components/Header"


function App() {

  // game status state start or stop
  const [isGameRunning, setIsGameRunning] = useState(false);

  const startGame = () => setIsGameRunning(true);
  const stopGame = () => setIsGameRunning(false);

  // score state
  const [score, setScore] = useState(0);


  return (
    <main className='bg-slate-500 w-screen h-screen
    flex flex-col justify-center items-center'>

      <Header />

      <Board isGameRunning={isGameRunning} setScore={setScore} />

      <GameControls isGameRunning={isGameRunning} score={score}
        startGame={startGame} stopGame={stopGame} />
    </main>
  )
}

export default App
