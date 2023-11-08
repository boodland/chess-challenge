import { render } from '@testing-library/react';
import { GameContext, GameProvider } from './game-context';
import { useContext } from 'react';

const useGameValue = {
  fen: 'The fen string',
  positions: 'The positions value',
  selectedPosition: 'The selected position',
  updateFen: vi.fn(),
  onClickPosition: vi.fn(),
};

const updateFenParam = 'New FEN';
const onClickPositionParam = 0;

vi.mock('./hooks', () => {
  return { useGame: () => useGameValue };
});

const TestingComponent = () => {
  const {
    fen,
    positions,
    selectedPosition,
    updateFen,
    onClickPosition,
  } = useContext(GameContext);

  updateFen(updateFenParam);
  onClickPosition(onClickPositionParam);
  return (
    <>
      <p>{fen}</p>
      <p>{positions}</p>
      <p>{selectedPosition}</p>
    </>
  );
};

describe('GameProvider', () => {
  it('provides expected GameContext obj to child elements', async () => {
    const { getByText } = render(
      <GameProvider>
        <TestingComponent />
      </GameProvider>
    );
    let value = getByText(useGameValue.fen);
    expect(value).toBeTruthy();
    value = getByText(useGameValue.positions);
    expect(value).toBeTruthy();
    value = getByText(useGameValue.selectedPosition);
    expect(value).toBeTruthy();
    expect(useGameValue.updateFen).toHaveBeenCalledOnce();
    expect(useGameValue.updateFen).toHaveBeenCalledWith(updateFenParam);
    expect(useGameValue.onClickPosition).toHaveBeenCalledOnce();
    expect(useGameValue.onClickPosition).toHaveBeenCalledWith(
      onClickPositionParam
    );
  });
});
