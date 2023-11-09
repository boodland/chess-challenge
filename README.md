# Chess Challenge

**Simple React application which allows the user to move pieces on a chess board.**

## Requeriments

The application supports FEN strings as input and also output. Specifically:

- When a valid FEN string is inserted into a text input it will display the corresponding chess pieces on the board.

- Chess pieces can render either as images or as a text abbreviation of the type of piece (i.e. p for pawn).

- Chess pieces can be selected, deselected and togged (switch to another piece of the same color) by clicking

- Once a chess piece is selected the piece can be moved by clicking on an empty square or a square occupied by an opposite color.

- Any piece can be moved to any suitable square. The app does not need to enforce chess piece movement rules.

- When a chess piece is moved the FEN input will be updated with the corresponding value

- The FEN value should be persisted, so that the “game” can continue after the page is reloaded

## FEN notation

Check these resources for more information on FEN notations:

- https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

- https://www.chess.com/terms/fen-chess#how-does-fen-work


## Clone repository

To clone the repository execute the command `git clone https://github.com/boodland/chess-challenge.git`. If you don't have `git` installed please follow the instructions in https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Install dependencies

To install the dependencies execute the command `npm install` within the root folder. If you don't have `npm` installed please follow the instructions in https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


## Start the app

To start the app locally execute the command `npm run start`. Open your browser and navigate to http://localhost:4200/. Happy game!


## Run the tests

To run the tests execute the command `npm run test`.


## Build the app

To build the app execute the command `npm run build`.