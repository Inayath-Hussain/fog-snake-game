import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ICell, ISnake } from "../interface";
import { createSnake } from "../utilities/createSnake";


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
    const [snakes, setSnakes] = useState<ISnake[]>([]);

    // diamond position state
    const [diamondDetails, setDiamondDetails] = useState<{ exists: boolean, position: ICell }>({ exists: false, position: { x: -1, y: -1 } });


    // create a new diamond when game has started and no diamonds are present on board
    useEffect(() => {
        if (isGameRunning === false || diamondDetails.exists) return

        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 20)

        console.log(x, y)
        setDiamondDetails({ exists: true, position: { x, y } })

    }, [isGameRunning, diamondDetails.exists])


    // create a snake when game has started
    useEffect(() => {

        if (isGameRunning === false || snakes.length > 0) return


        // four nodes
        // first node - random 0-9 0-19, check if it's not corners and only proceed when true
        // second node 
        // 1. 0-1 to decide which will be common with first node x(0) or y(1)
        // 2. 0-1 to decide whether the uncommon dimension should be increased by 1 or decreased by 1.
        // if the selected 2. is out of bounds or same as other node then select the other value
        // if the other value 

        // third and fourth nodes repeat the same as second node but keep the nodes common with second and third node respectively

        const snake = createSnake();
        setSnakes(prev => [...prev, snake])


    }, [isGameRunning])




    // create a snake when a diamond is collected
    // event handler when diamond cell is clicked
    const handleDiamonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();

        const diamondPosition = diamondDetails.position
        if (isGameRunning === false ||
            playerPosition.x !== diamondPosition.x || playerPosition.y !== diamondPosition.y) return

        // update score
        setScore(prev => prev + 10);


        // create new diamond
        const position: ICell = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 20) }
        setDiamondDetails(prev => ({ ...prev, position }))

        // add new snake
        const newSnake = createSnake();
        setSnakes(prev => [...prev, newSnake]);
    }


    // handler to update player position
    const updatePlayerPosition = (pos: ICell) => {

        // if game has not started or running then donot update position
        if (isGameRunning === false) return

        // restrict player to jump cells 
        if (Math.abs(playerPosition.x - pos.x) > 1 || Math.abs(playerPosition.y - pos.y) > 1) return

        // update player position
        setPlayerPosition(pos)
    }

    const cells = useMemo(createCells, []);


    // decide the color of each cell
    const cellColor = (pos: ICell) => {

        // if a snake node is present in this cell
        let isSnakePresent = snakes.some(s => s.nodes.some(d => d.x === pos.x && d.y === pos.y))

        // check if any one snake is present


        // if player is present in this cell
        if (playerPosition.x === pos.x && playerPosition.y === pos.y) {
            // if diamond is also present in this cell
            if (diamondDetails.position.x === pos.x && diamondDetails.position.y === pos.y) {
                // if snake node is present in this cell
                // return mix of blue green red
                if (isSnakePresent) return "#552b55"

                // only diamond and player are present in this cell
                return "#0891b2"
            }
            // if only player and snake are present in this cell
            else if (isSnakePresent) return "#804000"

            // if only player is present in this cell
            return "#16A34A"
        }

        // if diamond is present in this node
        else if (diamondDetails.position.x === pos.x && diamondDetails.position.y === pos.y) {
            // if snake node is present in this cell
            // return reddish blue
            if (isSnakePresent) return "#800080"

            // only diamond is present in this cell
            return "#2563eb"
        }


        // if only snake is present in this cell 
        else if (isSnakePresent) return "#dc2626"

        // nothing is present in this cell
        return "#000"
    }



    const isCellDiamond = (pos: ICell) => diamondDetails.position.x === pos.x && diamondDetails.position.y === pos.y


    return (
        <div className="grid grid-cols-board grid-rows-board">

            {cells.map((c, index) => (
                <div key={index} onMouseEnter={() => updatePlayerPosition(c)} onClick={isCellDiamond(c) ? handleDiamonClick : undefined}
                    style={{ background: cellColor(c) }}
                    className={`bg-black w-full h-full border-[1px] border-white box-border text-white`}>{c.x} , {c.y}</div>
            ))}

        </div>
    );
}

export default Board;