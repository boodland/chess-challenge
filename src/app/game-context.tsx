import { ReactNode, createContext } from 'react';
import { useGame } from './hooks';

type GameContextType = {
  positions: string[];
  fen: string;
  selectedPosition: number | undefined;
  updatePositions: (newPositions: string[]) => void;
  updateFen: (newFen: string) => void;
  onClickPosition: (position: number) => void;
};

const initialContextValue: GameContextType = {
  positions: [],
  fen: '',
  selectedPosition: undefined,
  updatePositions: (newPositions) => newPositions,
  updateFen: (newFen) => newFen,
  onClickPosition: (position) => position,
};

export const GameContext = createContext<GameContextType>(initialContextValue);

export type GameContextProviderProps = {
  children: ReactNode;
};

export const GameProvider = ({ children }: GameContextProviderProps) => {
  const game = useGame();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
