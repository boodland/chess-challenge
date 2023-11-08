import BoardRow from './board-row';
import styles from './board.module.css';
import { COLUMNS, ROWS } from './utils';

const boardColumnsRow = (
  <div className={styles['columns']}>
    {COLUMNS.map((column) => (
      <span key={column} className={styles['text']}>
        {column}
      </span>
    ))}
  </div>
);

function Board() {
  const boardCellRows = ROWS.map((position) => {
    return (
      <div key={position}>
        <span className={styles['text']}>{ROWS.length - position}</span>
        <BoardRow key={position} startPosition={position} />
      </div>
    );
  });

  return (
    <>
      {boardCellRows}
      {boardColumnsRow}
    </>
  );
}

export default Board;
