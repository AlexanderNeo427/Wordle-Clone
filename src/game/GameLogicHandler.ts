export const WORD_LENGTH = 5
export const NUM_ROWS = 6

export const randIntRange = (min: number, max: number): number => {
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

export class GameData {
    colIndex: number
    rowIndex: number
    gameBlockArrays: GameBlockData[][]

    constructor() {
        this.colIndex = 0
        this.rowIndex = 0
        this.gameBlockArrays = []
    }

    charsSoFar(): string {
        let accumulator = ""
        const currentRow = this.gameBlockArrays[this.rowIndex]
        currentRow.forEach(gameBlock => {
            accumulator += gameBlock.char
        })
        return accumulator
    }
}

export enum GAME_OP_STATUS {
    SUCCESS, 
    FAIL, 
    NOT_ENOUGH_LETTERS, 
    NOT_IN_WORDLIST
}

export class GameOperationResult {
    status: GAME_OP_STATUS
    gameData: GameData

    constructor(status: GAME_OP_STATUS, gameData: GameData) {
        this.status = status
        this.gameData = gameData
    }
}

export class GameLogic {
    // 'GameData' has an array of 'GameRowData'
    // Each 'GameRowData' has an array of 'GameBlockData'
    // Each 'GameBlockData' has a 'char' and a 'charState'
    public static createGameData(numRows: number, numCols: number): GameData {
        const gameData = new GameData()
        for (let row = 0; row < numRows; row++) {
            const rowOfGameBlocks: GameBlockData[] = []
            for (let col = 0; col < numCols; col++) {
                rowOfGameBlocks.push(new GameBlockData()) 
            }
            gameData.gameBlockArrays.push(rowOfGameBlocks)
        }
        return gameData
    }

    public static handlePlayerInput(gameData: GameData, key: string): GameOperationResult {
        const charsSoFar = gameData.charsSoFar()

        if (key === 'Enter') {
            return this.onEnterInput(gameData)
        }
        if (key === 'Backspace' || key === 'Delete') {
            return this.onDeleteInput(gameData)
        }

        const isAlphabetChar = /^[a-zA-Z]$/.test(key)
        if (isAlphabetChar) {
            return this.onAlphabetInput(gameData, key)
        }

        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, gameData)
    }

    private static onAlphabetInput(gameData: GameData, key: string): GameOperationResult {
        // if (charsSoFar.length < WORD_LENGTH) {
        //     const rowLength = gameData.gameBlocks[gameData.rowIndex].length
        // }
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, gameData)
    }

    private static onDeleteInput(gameData: GameData): GameOperationResult {
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, gameData)
    }

    private static onEnterInput(gameData: GameData): GameOperationResult {
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, gameData)
    }
}
