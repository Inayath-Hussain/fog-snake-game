export interface ICell {
    x: number
    y: number
}


export interface ISnake {
    // direction of the second node with respect to first node. this value is stored to know that snake cannot move that way
    direction: "up" | "down" | "left" | "right"
    nodes: {
        x: number
        y: number
    }[]
}
