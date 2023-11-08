import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './game-actions.module.css';
import { INITIAL_FEN, isFenValid } from './utils';
import { GameContext } from './game-context';

const INPUT_LABEL = 'Current FEN';

const GameActions = () => {
  const { fen, updateFen } = useContext(GameContext);
  const [newFen, setNewFen] = useState(fen);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setNewFen(fen);
  }, [fen]);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewFen(event.currentTarget.value);
  };

  const onRestartGame = () => {
    updateFen(INITIAL_FEN);
    setNewFen(INITIAL_FEN);
    setHasError(false);
  };

  const onApplyFen = () => {
    if (!isFenValid(newFen)) {
      setHasError(true);
    } else {
      setHasError(false);
      updateFen(newFen);
    }
  };

  return (
    <div className={styles['actions']}>
      <div>
        <button onClick={onRestartGame}>Restart</button>
      </div>
      <div>
        <label htmlFor="fen">{INPUT_LABEL}</label>
        <div className={styles['input-container']}>
          <textarea id="fen" value={newFen} onChange={onChangeHandler} />
          <button onClick={onApplyFen}>Apply</button>
        </div>
        {hasError && (
          <div className={styles['error-container']}>
            The entered FEN string is not valid
          </div>
        )}
      </div>
    </div>
  );
};

export default GameActions;
