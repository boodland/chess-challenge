import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './game-actions.module.css';
import { INITIAL_FEN } from './utils';
import { GameContext } from './game-context';

const INPUT_LABEL = 'Current FEN';

const GameActions = () => {
  const { fen, updateFen } = useContext(GameContext);
  const [newFen, setNewFen] = useState(fen);

  useEffect(() => {
    setNewFen(fen);
  }, [fen]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewFen(event.currentTarget.value);
  };

  const onRestartGame = () => {
    updateFen(INITIAL_FEN);
    setNewFen(INITIAL_FEN);
  };

  const onApplyFen = () => {
    updateFen(newFen);
  };

  return (
    <div className={styles['actions']}>
      <div>
        <button onClick={onRestartGame}>Restart</button>
      </div>
      <div>
        <label htmlFor="fen">{INPUT_LABEL}</label>
        <div className={styles['input-container']}>
          <input
            type="text"
            id="fen"
            value={newFen}
            onChange={onChangeHandler}
          />
          <button onClick={onApplyFen}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default GameActions;
