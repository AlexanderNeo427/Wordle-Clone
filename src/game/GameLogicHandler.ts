const randIntRange = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

export enum CHAR_STATE {
    CORRECT, // Correct letter - Correct position
    HALF_CORRECT, // Correct letter - Wrong position
    WRONG, // Self-explanatory
    NIL, // NIL state for...reasons
}

export class GameBlockData {
    char: string
    state: CHAR_STATE

    constructor() {
        this.char = ""
        this.state = CHAR_STATE.NIL
    }
}

export class GameRowData {
    colIndex: number
    gameBlocks: GameBlockData[]

    constructor() { 
        this.colIndex = 0
        this.gameBlocks = [] 
    }
}

export class GameData {
    rowIndex: number
    gameRowData: GameRowData[]

    constructor() {
        this.rowIndex = 0
        this.gameRowData = []
    }

    getCurrentRowData(): GameRowData {
        return this.gameRowData[this.rowIndex]
    }

    charsSoFar(): string {
        let accumulate = ""
        this.gameRowData[this.rowIndex].gameBlocks.forEach(gameBlock => {
            accumulate += gameBlock.char
        })
        return accumulate
    }
}

export enum GAME_STATUS {
    SUCCESS, 
    FAIL, 
    NOT_ENOUGH_LETTERS, 
    NOT_IN_WORDLIST
}

export class GameOperationData {
    status: GAME_STATUS
    gameData: GameData

    constructor(status: GAME_STATUS, gameData: GameData) {
        this.status = status
        this.gameData = gameData
    }
}

export class GameLogic {
    public static createGameData(numRows: number, numCols: number): GameData {
        const gameData = new GameData()
        for (let row = 0; row < numRows; row++) {
            const gameRow = new GameRowData()
            for (let col = 0; col < numCols; col++) {
                const gameBlock = new GameBlockData()
                gameBlock.state = CHAR_STATE.NIL
                gameRow.gameBlocks.push(gameBlock)
            }
            gameData.gameRowData.push(gameRow)
        }
        return gameData
    }

    public static handlePlayerInput(gameData: GameData, key: string): GameOperationData {
        const charsSoFar = gameData.charsSoFar()

        const isAlphabetChar = /^[a-zA-Z]$/.test(key)
    }

    private static onAlphabetInput(key: string): GameOperationData {

    }

    private static onDeleteInput(): GameOperationData {
    }

    private static onEnterInput(): GameOperationData {
    }
}
