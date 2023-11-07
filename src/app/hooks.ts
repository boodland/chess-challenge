import { useState } from "react";
import { FEN_ROWS_SEPARATOR, ROWS, areSameColor, getFromLocalStorage, isEmpty, saveToLocalStorage } from "./utils";

export function useGame() {
    const savedFen = getFromLocalStorage();
    const [positions, setPositions] = useState(convertToPositions(savedFen));
    const [fen, setFen] = useState(savedFen);
    const [selectedPosition, setSelectedPosition] = useState<number | undefined>(undefined);

    const setAndPersistFen = (newFen: string) => {
        setFen(newFen);
        saveToLocalStorage(newFen);
    }

    const updatePositions = (newPositions: string[]) => {
        setPositions(newPositions);
        setAndPersistFen(convertToFen(newPositions));
    };
    const updateFen = (newFen: string) => {
        setAndPersistFen(newFen);
        setPositions(convertToPositions(newFen));
    }

    const moveSelectedPositionTo = (position: number, selectedPositionPiece: string) => {
        const newPositions = [...positions];
        newPositions[selectedPosition as number] = "";
        newPositions[position] = selectedPositionPiece;
        setSelectedPosition(undefined);
        updatePositions(newPositions);
    }

    const onClickPosition = (position: number) => {
        const piece = positions[position];
        if (isEmpty(piece) && !hasSelectedPosition(selectedPosition)) return;
        if (!hasSelectedPosition(selectedPosition)) {
            setSelectedPosition(position);
            return;
        }
        if (isSamePosition(position, selectedPosition)) {
            setSelectedPosition(undefined);
            return;
        }
        const selectedPositionPiece = positions[selectedPosition as number];
        if (areSameColor(piece, selectedPositionPiece)) {
            setSelectedPosition(position);
            return;
        }
        moveSelectedPositionTo(position, selectedPositionPiece);
    }

    return { positions, fen, selectedPosition, updatePositions, updateFen, onClickPosition };
}

function hasSelectedPosition(selectedPosition?: number) {
    return typeof selectedPosition !== "undefined";
}

function isSamePosition(position1: number, position2?: number) {
    return position1 === position2;
}

function convertToPositions(fenPositions: string) {
    const positions: string[] = [];
    const fenRows = fenPositions.split(FEN_ROWS_SEPARATOR);
    fenRows.forEach((fenRow) => {
        const rowPositions = getRowPositions(fenRow);
        positions.push(...rowPositions);
    });

    return positions;
}

function getRowPositions(fenRow: string) {
    const rowPositions: string[] = [];
    [...fenRow].forEach(char => {
        rowPositions.push(...getPosition(char));
    })
    return rowPositions;
}

function getPosition(char: string) {
    const tryToParse = parseInt(char);
    if (isNaN(tryToParse)) {
        return [char];
    }
    else {
        const emptyPosition = Array(tryToParse).fill("");
        return emptyPosition;
    }
}

function convertToFen(positions: string[]) {
    const fenRows: string[] = [];
    ROWS.forEach((row) => {
        const startPosition = row * ROWS.length;
        const endPosition = startPosition + ROWS.length;
        const rowPositions = positions.slice(startPosition, endPosition);
        fenRows.push(getFenRow(rowPositions));
    });
    return fenRows.join(FEN_ROWS_SEPARATOR);
}

function getFenRow(positions: string[]) {
    const fenRow: (string | number)[] = [];
    let currentPosition = 0;
    while (currentPosition < positions.length) {
        let increment = 1;
        if (!isEmpty(positions[currentPosition])) {
            fenRow.push(positions[currentPosition]);
        }
        else {
            increment = getEmptyConsecutivePositions(positions.slice(currentPosition));
            fenRow.push(increment);
        }
        currentPosition = currentPosition + increment;
    }
    return fenRow.join("");
}

function getEmptyConsecutivePositions(positions: string[]) {
    const end = positions.findIndex((char) => !isEmpty(char));
    return (end === -1) ? positions.length : end;
}