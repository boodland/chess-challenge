import styles from './game.module.css';
import Board from './board';
import GameActions from './game-actions';
import { GameProvider } from './game-context';

function Game() {
  return (
    <GameProvider>
      <div className={styles['game']}>
        <div>
          <Board />
        </div>
        <div className={styles['right-panel']}>{<GameActions />}</div>
      </div>
    </GameProvider>
  );
}

export default Game;
