// based on direction create array of 3 directions
// random 0 - 2 to pick direction
// if 
// up first node of snake x - 1
// down x + 1
// left y - 1
// right y + 1

import { ICell, ISnake } from "../interface";

// if it leads to out of bound remove that direction from array and try again from random but this time 1 less

// when a valid direction is picked replace that snake with that direction
// insert the new pos at start of array and remove the last element



const isOutOfBound = (pos: ICell) => pos.x < 0 || pos.x > 9 || pos.y < 0 || pos.y > 19


const getDirectionOfSecondNodeWRTFirst = (direction: ISnake["direction"]): ISnake["direction"] => {
    switch (direction) {
        case ("down"):
            return "up"

        case ("up"):
            return "down"

        case ("left"):
            return "right"

        case ("right"):
            return "left"
    }
}



export const moveSnake = (snake: ISnake): ISnake => {
    let directions: ISnake["direction"][] = ["down", "left", "right", "up"];
    directions = directions.filter(d => d !== snake.direction);

    let newDirection = directions[Math.floor(Math.random() * 3)]
    console.log(newDirection)
    let newPos: ICell = { x: -1, y: -1 }

    // we would need to try atmost 3 time to get a valid new position
    for (let i = 0; i < 3; i++) {
        newPos = { x: -1, y: -1 }

        switch (newDirection) {
            case ("down"):
                newPos.x = snake.nodes[0].x + 1;
                newPos.y = snake.nodes[0].y;
                break;

            case ("left"):
                newPos.y = snake.nodes[0].y - 1;
                newPos.x = snake.nodes[0].x
                break;

            case ("right"):
                newPos.y = snake.nodes[0].y + 1;
                newPos.x = snake.nodes[0].x
                break;

            case ("up"):
                newPos.x = snake.nodes[0].x - 1;
                newPos.y = snake.nodes[0].y;
                break;
        }

        // check if new values are out of bound
        if (isOutOfBound(newPos) === false) break;

        directions = directions.filter(d => d !== newDirection);
        newDirection = directions[Math.floor(Math.random() * (directions.length - 1))]
    }


    // direction of second node with respect to first node
    const directionOfSecondNodeWRTFirst = getDirectionOfSecondNodeWRTFirst(newDirection)

    snake.direction = directionOfSecondNodeWRTFirst;
    snake.nodes.pop()
    snake.nodes.unshift(newPos)

    return snake;
}
