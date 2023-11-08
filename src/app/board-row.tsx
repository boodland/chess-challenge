import { useContext } from 'react';
import BoardCellMemoized from './board-cell';
import { COLUMNS, CellTypeEnum, isEmpty } from './utils';
import { GameContext } from './game-context';

const getCellColors = (row: number) => {
  return (row % 2 !== 0) ?
      [CellTypeEnum.light, CellTypeEnum.dark] :
      [CellTypeEnum.dark, CellTypeEnum.light];
}

export interface BoardRowProps {
  startPosition: number;
}

function BoardRow({ startPosition }: BoardRowProps) {
  const { positions, selectedPosition, onClickPosition } =
    useContext(GameContext);
  const boardRowPosition = COLUMNS.map(
    (column, index) => index + startPosition * COLUMNS.length
  );
  const cellColors = getCellColors(startPosition);
  const boardRowCells = boardRowPosition.map((position) => {
    const piece = positions[position];
    const isBlocked = isEmpty(piece) && typeof selectedPosition === 'undefined';
    const onClickHandler = isBlocked
      ? () => undefined
      : () => onClickPosition(position);
    return (
      <BoardCellMemoized
        key={position}
        piece={piece}
        type={cellColors[position % 2]}
        blocked={isBlocked}
        selected={selectedPosition === position}
        onClick={onClickHandler}
      />
    );
  });
  return <div>{boardRowCells}</div>;
}

export default BoardRow;
