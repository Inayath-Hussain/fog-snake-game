import { Dispatch, SetStateAction, useMemo, useState } from "react";

interface ICell {
    x: number
    y: number
}

const createCells = (): ICell[] => {
    const cell: ICell[] = []

    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 20; i++) {
            cell.push({ x: j, y: i })
        }
    }

    return cell;
}


interface Iprops {
    isGameRunning: boolean
    setScore: Dispatch<SetStateAction<number>>
}

const Board: React.FC<Iprops> = ({ isGameRunning, setScore }) => {

    // current position state
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });


    // snakes state [] - each elem contains positions - four pos and direction - "up" | "down" "left" | "right"


    // diamond position state
    const [diamondPosition, setDiamondPosition] = useState<ICell>({ x: 0, y: 0 });


    // function to generate random values from 0 to 19 and from 0 to 9 for diamond position



    const updatePlayerPosition = (pos: ICell) => {

        // if game has not started or running then donot update position
        if (isGameRunning === false) return

        // restrict player to jump cells 
        if (Math.abs(playerPosition.x - pos.x) > 1 || Math.abs(playerPosition.y - pos.y) > 1) return

        // update player position
        setPlayerPosition(pos)
    }

    const cells = useMemo(createCells, []);

    const isPlayerPosition = (pos: ICell) => pos.x === playerPosition.x && pos.y === playerPosition.y;

    return (
        <div className="grid grid-cols-board grid-rows-board">

            {cells.map((c, index) => (
                <div key={index} onMouseEnter={() => updatePlayerPosition(c)}
                    style={isPlayerPosition(c) ? { background: "#16A34A" } : {}}
                    className={`bg-black w-full h-full border-[1px] border-white box-border text-white`}>{c.x} , {c.y}</div>
            ))}

        </div>
    );
}

export default Board;