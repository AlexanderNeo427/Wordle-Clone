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
    wordOfTheDay: string
    colIndex: number
    rowIndex: number
    gameBlockArrays: GameBlockData[][]

    constructor() {
        this.wordOfTheDay = ""
        this.colIndex = 0
        this.rowIndex = 0
        this.gameBlockArrays = []
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

// TODO: Load from wordlist yadayada
export const loadRandomWord = (): string => {
    const wordlist: string[] = [
        "argue", "arise", "audio", "cow", "block", "blooood", "shat", "fart", "supercalifrag"
    ]
    return wordlist[randIntRange(0, wordlist.length - 1)]
}

export class GameLogic {
    // 'GameData' has an array of 'GameRowData'
    // Each 'GameRowData' has an array of 'GameBlockData'
    // Each 'GameBlockData' has a 'char' and a 'charState'
    public static createGameData(wordOfTheDay: string, numRows: number): GameData {
        const gameData = new GameData()
        gameData.wordOfTheDay = wordOfTheDay

        for (let row = 0; row < numRows; row++) {
            const rowOfGameBlocks: GameBlockData[] = []
            for (let col = 0; col < wordOfTheDay.length; col++) {
                rowOfGameBlocks.push(new GameBlockData())
            }
            gameData.gameBlockArrays.push(rowOfGameBlocks)
        }
        return gameData
    }

    public static handlePlayerInput(gameData: GameData, lowercaseKey: string): GameOperationResult {
        console.log("Handle Player Input: ", lowercaseKey)
        if (lowercaseKey === 'Enter') {
            return this.onEnterInput(gameData)
        }
        if (lowercaseKey === 'Backspace' || lowercaseKey === 'Delete') {
            return this.onDeleteInput(gameData)
        }

        const isAlphabetChar = /^[a-zA-Z]$/.test(lowercaseKey)
        if (isAlphabetChar) {
            return this.onAlphabetInput(gameData, lowercaseKey)
        }
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, { ...gameData } as GameData)
    }

    private static onAlphabetInput(gameData: GameData, key: string): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        if (gameData.colIndex < gameBlockArray.length) {
            gameBlockArray[gameData.colIndex].char = key
            gameData.colIndex++
        }
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, { ...gameData } as GameData)
    }

    private static onDeleteInput(gameData: GameData): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        if (gameData.colIndex > 0) {
            gameData.colIndex--
            gameBlockArray[gameData.colIndex].char = ""
        }
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, { ...gameData } as GameData)
    }

    private static onEnterInput(gameData: GameData): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        const rowLength = gameBlockArray.length
        const numRows = gameData.gameBlockArrays.length

        if (gameData.colIndex < rowLength) {
            return new GameOperationResult(GAME_OP_STATUS.NOT_ENOUGH_LETTERS, { ...gameData } as GameData)
        } 

        gameBlockArray.forEach((gameBlock, idx) => {
            const correctChar = gameData.wordOfTheDay[idx]
            const currentChar = gameBlock.char

            if (currentChar === correctChar) {
                gameBlock.state = CHAR_STATE.CORRECT
            }
            else if (gameData.wordOfTheDay.includes(currentChar)) {
                gameBlock.state = CHAR_STATE.HALF_CORRECT
            }
            else {
                gameBlock.state = CHAR_STATE.WRONG
            }
        })
        gameData.colIndex = 0
        gameData.rowIndex++
        return new GameOperationResult(GAME_OP_STATUS.SUCCESS, { ...gameData } as GameData)
    }
}
