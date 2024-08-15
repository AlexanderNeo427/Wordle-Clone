export const WORD_LENGTH = 5
export const NUM_ROWS = 6

export const randIntRange = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

export enum CHAR_STATE {
    NIL = 0, // NIL state for...reasons
    WRONG = 1, // Self-explanatory
    HALF_CORRECT = 2, // Correct letter - Wrong position
    CORRECT = 3, // Correct letter - Correct position
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
    WIN, LOSE,
    OP_SUCCESS,
    NOT_ENOUGH_LETTERS,
    NOT_IN_WORDLIST
}

export class GameOperationResult {
    status: GAME_OP_STATUS
    gameData: GameData
    keyData: Map<string, CHAR_STATE>

    constructor(status: GAME_OP_STATUS, gameData: GameData, keyData: Map<string, CHAR_STATE>) {
        this.status = status
        this.gameData = gameData
        this.keyData = keyData
    }
}

// TODO: Load from wordlist yadayada
export const loadRandomWord = (): string => {
    const wordlist: string[] = [
        "argue", "arise", "audio", "cow", "block", "blooood", "shart", "fart", "supercalifrag"
    ]
    return wordlist[randIntRange(0, wordlist.length - 1)]
}

export class GameLogic {
    public static initializeKeyData(): Map<string, CHAR_STATE> {
        const keyData = new Map<string, CHAR_STATE>()
        for (let i = 97; i <= 122; i++) {
            const chr = String.fromCharCode(i)
            keyData.set(chr, CHAR_STATE.NIL)
        }
        return keyData
    }

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

    public static handlePlayerInput(lowercaseKey: string, gameData: GameData, keyData: Map<string, CHAR_STATE>): GameOperationResult {
        if (lowercaseKey === 'Enter') {
            return this.onEnterInput(gameData, keyData)
        }
        if (lowercaseKey === 'Backspace' || lowercaseKey === 'Delete') {
            return this.onDeleteInput(gameData, keyData)
        }

        const isAlphabetChar = /^[a-zA-Z]$/.test(lowercaseKey)
        if (isAlphabetChar) {
            return this.onAlphabetInput(gameData, lowercaseKey, keyData)
        }
        return new GameOperationResult(GAME_OP_STATUS.OP_SUCCESS, { ...gameData } as GameData, keyData)
    }

    private static onAlphabetInput(gameData: GameData, key: string, keyData: Map<string, CHAR_STATE>): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        if (gameData.colIndex < gameBlockArray.length) {
            gameBlockArray[gameData.colIndex].char = key
            gameData.colIndex++
        }
        return new GameOperationResult(
            GAME_OP_STATUS.OP_SUCCESS,
            { ...gameData } as GameData,
            new Map(keyData)
        )
    }

    private static onDeleteInput(gameData: GameData, keyData: Map<string, CHAR_STATE>): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        if (gameData.colIndex > 0) {
            gameData.colIndex--
            gameBlockArray[gameData.colIndex].char = ""
        }
        return new GameOperationResult(
            GAME_OP_STATUS.OP_SUCCESS, 
            { ...gameData } as GameData, 
            new Map(keyData)
        )
    }

    private static onEnterInput(gameData: GameData, keyData: Map<string, CHAR_STATE>): GameOperationResult {
        const gameBlockArray = gameData.gameBlockArrays[gameData.rowIndex]
        const rowLength = gameBlockArray.length

        if (gameData.colIndex < rowLength) {
            return new GameOperationResult(
                GAME_OP_STATUS.NOT_ENOUGH_LETTERS, 
                { ...gameData } as GameData, 
                new Map(keyData)
            )
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

            const desiredCharState = gameBlock.state
            const currentCharState = keyData.get(currentChar) || CHAR_STATE.NIL
            const finalCharState: CHAR_STATE = Math.max(desiredCharState, currentCharState)
            keyData.set(currentChar, finalCharState)
        })

        const rowString = this.gameBlockArrayString(gameBlockArray).toLowerCase()
        const guessIsCorrect = (rowString === gameData.wordOfTheDay)
        if (guessIsCorrect) {
            return new GameOperationResult(
                GAME_OP_STATUS.WIN,
                { ...gameData } as GameData, 
                new Map(keyData)
            )
        }

        const numRows = gameData.gameBlockArrays.length
        const onLastRow = gameData.rowIndex >= numRows - 1
        if (onLastRow && !guessIsCorrect) {
            return new GameOperationResult(
                GAME_OP_STATUS.LOSE, 
                { ...gameData } as GameData,
                new Map(keyData) 
            )
        }

        gameData.colIndex = 0
        gameData.rowIndex++
        return new GameOperationResult(
            GAME_OP_STATUS.OP_SUCCESS, 
            { ...gameData } as GameData,
            new Map(keyData) 
        )
    }

    private static gameBlockArrayString(gameBlockArray: GameBlockData[]): string {
        let accumulator = ""
        gameBlockArray.forEach(gameBlock => {
            accumulator += gameBlock.char
        })
        return accumulator
    }
}
