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

export const INITIAL_POSITIONS = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
]

export const UPDATED_FEN = 'rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR'

export const UPDATED_POSITIONS = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', 'P', '', '', '', '', '',
    'P', 'P', '', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
]

export const UPDATED_FEN_OCCUPIED = 'Rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/1NBQKBNR'

export const UPDATED_POSITIONS_OCCUPIED = [
    'R', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    '', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
]