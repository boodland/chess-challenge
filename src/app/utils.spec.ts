import {
    COLUMNS,
    CellTypeEnum,
    FEN_ROWS_SEPARATOR,
    INITIAL_FEN,
    LOCAL_STORAGE_KEY,
    ROWS,
    areSameColor,
    getColor,
    getFromLocalStorage,
    getShape,
    isEmpty,
    saveToLocalStorage,
} from './utils';

import { EMPTY_PIECE, PieceShape, getRandomBlackPiece, getRandomWhitePiece } from './test-utils';

describe('utils', () => {
    describe('COLUMNS should have', () => {
        it('correct values', () => {
            expect(COLUMNS).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
        });
    });

    describe('ROWS should have', () => {
        it('correct values', () => {
            expect(ROWS).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe('FEN_ROWS_SEPARATOR should have', () => {
        it('correct value', () => {
            expect(FEN_ROWS_SEPARATOR).toEqual('/');
        });
    });

    describe('INITIAL_FEN should have', () => {
        it('correct value', () => {
            expect(INITIAL_FEN).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
        });
    });

    describe('CellTypeEnum should have', () => {
        it('correct values', () => {
            expect(CellTypeEnum.light).toEqual('light');
            expect(CellTypeEnum.dark).toEqual('dark');
        });
    });

    describe('getColor should returns', () => {
        it('white if piece is upper case', () => {
            expect(getColor(getRandomWhitePiece())).toEqual('white');
        });
        it('black if piece is lower case', () => {
            expect(getColor(getRandomBlackPiece())).toEqual('black');
        });
    });

    describe('areSameColor should returns', () => {
        it('false if one of the pieces is empty', () => {
            expect(areSameColor(EMPTY_PIECE, getRandomWhitePiece())).toEqual(false);
            expect(areSameColor(getRandomBlackPiece(), EMPTY_PIECE)).toEqual(false);
        });
        it('false if one piece is white and the other is black', () => {
            expect(areSameColor(getRandomWhitePiece(), getRandomBlackPiece())).toEqual(false);
            expect(areSameColor(getRandomBlackPiece(), getRandomWhitePiece())).toEqual(false);
        });
        it('true if both pieces are white or black', () => {
            expect(areSameColor(getRandomWhitePiece(), getRandomWhitePiece())).toEqual(true);
            expect(areSameColor(getRandomBlackPiece(), getRandomBlackPiece())).toEqual(true);
        });
    });

    describe('getShape should returns', () => {
        it('the correct shape', () => {
            Object.entries(PieceShape).forEach(([piece, shape]) => {
                expect(getShape(piece)).toEqual(shape);
            });
        });
    });

    describe('isEmpty should returns', () => {
        it('true when the piece is empty', () => {
            expect(isEmpty(EMPTY_PIECE)).toEqual(true);
        });
        it('false when the piece is black or white', () => {
            expect(isEmpty(getRandomWhitePiece())).toEqual(false);
            expect(isEmpty(getRandomBlackPiece())).toEqual(false);
        });
    });

    describe('getFromLocalStorage should returns', () => {
        afterEach(() => {
            localStorage.clear();
        });

        it('Initial FEN if local storage is empy', () => {
            expect(getFromLocalStorage()).toEqual(INITIAL_FEN);
        });
        it('stored FEN if local storage is not empty', () => {
            const storedFEN = 'stored FEN';
            localStorage.setItem(LOCAL_STORAGE_KEY, storedFEN)
            expect(getFromLocalStorage()).toEqual(storedFEN);
        });
    });

    describe('saveToLocalStorage should store', () => {
        afterEach(() => {
            localStorage.clear();
        });

        it('FEN in the local storage', () => {
            const fenToStore = "FEN to store";
            saveToLocalStorage(fenToStore);
            expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toEqual(fenToStore);
        });
    });
});