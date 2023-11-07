import { memo } from 'react';
import styles from './board-cell.module.css';
import { CellTypeEnum, getShape } from './utils';

export interface BoardCellProps {
  piece: string;
  type: CellTypeEnum;
  blocked?: boolean;
  selected?: boolean;
  onClick: () => void;
}

const BoardCellMemoized = memo(
  ({ piece, type, blocked, selected, onClick }: BoardCellProps) => {
    const blockedClass = blocked ? styles[`blocked`] : '';
    const selectedClass = selected ? styles[`selected`] : '';
    const pieceShape = getShape(piece);

    return (
      <button
        className={`${styles['cell']} ${styles[type]} ${blockedClass} ${selectedClass}`}
        onClick={onClick}
      >
        {pieceShape}
      </button>
    );
  }
);

export default BoardCellMemoized;
