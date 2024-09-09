import { MASTER_WORDLIST } from "../wordlist"

export const WORD_LENGTH = 5
export const NUM_ROWS = 6

export const randIntRange = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}
//===================================================================================
export abstract class GridRowEvent { }

export class InputEvent extends GridRowEvent {
    eventKey: string

    constructor(eventKey: string) {
        super()
        this.eventKey = eventKey
    }
}
//===================================================================================
export abstract class AppEvent {}

export class WordCompletedEvent extends AppEvent {
    keyData: Map<string, CHAR_STATE>
    completedRowIndex: number
    guessIsCorrect: boolean

    constructor(keyData: Map<string, CHAR_STATE>, completedRowIndex: number, guessIsCorrect: boolean) {
        super()
        this.keyData = keyData
        this.completedRowIndex = completedRowIndex
        this.guessIsCorrect = guessIsCorrect
    }
}

export class NotEnoughLettersEvent extends AppEvent {}
//===================================================================================
export enum CHAR_STATE {
    NIL = 0, // NIL state for...reasons
    WRONG = 1, // Self-explanatory
    HALF_CORRECT = 2, // Correct letter - Wrong position
    CORRECT = 3, // Correct letter - Correct position
}

export enum GAME_OP_STATUS {
    WIN,
    LOSE,
    OP_SUCCESS,
    NOT_ENOUGH_LETTERS,
    NOT_IN_WORDLIST
}

export const loadWordList = (): Set<string> => {
    const MIN_LENGTH = 4 
    const setOfWords = new Set<string>()
    MASTER_WORDLIST.forEach((word: string) => {
        if (word.length >= MIN_LENGTH) {
            setOfWords.add(word.toLowerCase())
        }
    }) 
    return setOfWords
    // return new Set<string>([
    //     "argue", "arise", "audio", "cow", "block", "blooood", "shart", "fart", "supercalifrag"
    // ])
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
}
