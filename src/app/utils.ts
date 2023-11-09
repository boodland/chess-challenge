export const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const ROWS = [0, 1, 2, 3, 4, 5, 6, 7];
export const FEN_ROWS_SEPARATOR = "/";
export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
export const LOCAL_STORAGE_KEY = "fen";

export enum CellTypeEnum {
    light = "light",
    dark = "dark",
};

enum PieceShapeEnum {
    'K' = '♔',
    'Q' = '♕',
    'R' = '♖',
    'B' = '♗',
    'N' = '♘',
    'P' = '♙',
    'k' = '♚',
    'q' = '♛',
    'r' = '♜',
    'b' = '♝',
    'n' = '♞',
    'p' = '♟',
    '' = '',
}

export function getColor(piece: string) {
    return (piece === piece.toUpperCase()) ? "white" : "black";
}

export function areSameColor(piece1: string, piece2: string) {
    return !isEmpty(piece1) && !isEmpty(piece2) && getColor(piece1) === getColor(piece2);
}

export function getShape(piece: string) {
    return PieceShapeEnum[piece as keyof typeof PieceShapeEnum];
}

export function isEmpty(piece: string) {
    return piece === "";
}

export function getFromLocalStorage(): string {
    const localFen = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localFen || INITIAL_FEN;
}

export function saveToLocalStorage(fen: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY, fen);
}

export function isFenValid(fen: string) {
    let isValid = isFenWellConstructed(fen);
    isValid = isValid && areNumberOfItemsInSectionsCorrect(fen);
    isValid = isValid && areNumberOfPiecesCorrect(fen);
    return isValid;
}

function isFenWellConstructed(fen: string) {
    const isValid = /^(?!.*\d{2,}.*)([1-8PNBRQK]+\/){7}[1-8PNBRQK]+$/gim.test(fen);
    return isValid;
}

function areNumberOfItemsInSectionsCorrect(fen: string) {
    const fenSections = fen.split(FEN_ROWS_SEPARATOR);
    let isValid =  true;
    fenSections.forEach((section) => {
        isValid = isValid && isNumberOfItemsInSectionCorrect(section);
    });
    return isValid;
}

function isNumberOfItemsInSectionCorrect(section: string) {
    const sectionChars = [...section];
    const total =  sectionChars.reduce((total, char) => {
        let increment = parseInt(char);
        if(isNaN(increment)) increment = 1;
        return total + increment;
    }, 0);
    return total === 8;
}

function areNumberOfPiecesCorrect(fen: string) {
    const fenChars = [...fen];
    let isValid = isNumberOfPieceCorrect(fenChars, 'p', 8);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'P', 8);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'r', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'R', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'n', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'N', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'b', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'B', 2);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'k', 1);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'K', 1);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'Q', 1);
    isValid = isValid && isNumberOfPieceCorrect(fenChars, 'q', 1);
    return isValid;
}

function isNumberOfPieceCorrect(fen: string[], piece: string, maximum: number) {
    const total = fen.filter((char) => char === piece).length;
    return total <= maximum;
}