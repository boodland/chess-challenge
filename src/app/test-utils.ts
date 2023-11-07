const PIECES = 'KQRBNP';

export const PieceShape = {
    'K': '♔',
    'Q': '♕',
    'R': '♖',
    'B': '♗',
    'N': '♘',
    'P': '♙',
    'k': '♚',
    'q': '♛',
    'r': '♜',
    'b': '♝',
    'n': '♞',
    'p': '♟',
    '': '',
};

export const EMPTY_PIECE = PieceShape[''];

const getRandomPiece = () => PIECES.charAt(Math.floor(Math.random() * PIECES.length));
export const getRandomWhitePiece = getRandomPiece;
export const getRandomBlackPiece = () => getRandomPiece().toLowerCase();

export const EMPTY_HANDLER = () => null;

