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
