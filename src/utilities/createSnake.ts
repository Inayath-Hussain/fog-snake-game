import { ICell, ISnake } from "../interface";


const isOutOfBound = (dimension: "x" | "y", value: number) => {
    switch (dimension) {
        case ("x"):
            return value < 0 || value > 9

        case ("y"):
            return value < 0 || value > 19
    }
}


const isOverlapping = (dimension: "x" | "y", value: number, snakeNodes: ICell[]) => {
    let overlaps = false;

    snakeNodes.forEach(s => {
        if (s[dimension] === value) overlaps = true
    })

    return overlaps;
}




export const createSnake = (): ISnake => {
    const snakeNodes: ICell[] = [];

    const firstNode = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 20) };
    snakeNodes.push(firstNode)

    // three more nodes are required hence for loop with 3 iterations
    for (let i = 0; i <= 2; i++) {
        let commonDimension: keyof ICell = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
        let unCommonDimension: keyof ICell = commonDimension === "x" ? "y" : "x";
        const previousNode = snakeNodes[snakeNodes.length - 1];

        let node: ICell = { x: 0, y: 0 }

        const createNode = (newValue: number) => {
            node = { [commonDimension]: previousNode[commonDimension], [unCommonDimension]: newValue } as unknown as ICell
        }

        // atmost 2 times of this computation will run. one for x-axis if a valid value is not possible fail then for y-axis
        for (let z = 0; z < 2; z++) {

            let tryAgain = false;
            let operation = Math.floor(Math.random() * 2) === 0 ? "increase" : "decrease";


            // for loop with 2 iterations is run because atmost only two times of this computation is required.
            // one for the first time and if newValue is out of range or overlaps another node then second time with differnt operation is run
            for (let j = 0; j < 2; j++) {

                let newValue = operation === "increase" ? previousNode[unCommonDimension] + 1 : previousNode[unCommonDimension] - 1;


                // check if new value is outside of grid
                // check if new value overlap any node
                if (isOutOfBound(unCommonDimension, newValue) === false &&
                    isOverlapping(unCommonDimension, newValue, snakeNodes) === false) {
                    createNode(newValue)
                    break;
                }


                // if(isOverlapping(unCommonDimension, newValue, snakeNodes) === false)    {
                // createNode(newValue)
                //     break;
                // }

                // switch to the alternate operation 
                operation = operation === "increase" ? "decrease" : "increase";

                // if conditions fails at second iteration then alternate dimension is selected and computed again
                if (j === 1) tryAgain = true
            }

            if (tryAgain === false) break;


            let temp = commonDimension;
            commonDimension = unCommonDimension;
            unCommonDimension = temp;

            node[commonDimension]
        }

        snakeNodes.push(node)
    }

    let direction: ISnake["direction"] = "left";

    switch (true) {
        case (snakeNodes[0].x === snakeNodes[1].x):
            if (snakeNodes[0].y < snakeNodes[1].y) direction = "left"
            else if (snakeNodes[0].y > snakeNodes[1].y) direction = "right"
            break;

        case (snakeNodes[0].y === snakeNodes[1].y):
            if (snakeNodes[0].x < snakeNodes[1].x) direction = "up"
            else if (snakeNodes[0].x > snakeNodes[1].x) direction = "down"
    }

    return { direction, nodes: snakeNodes };
}