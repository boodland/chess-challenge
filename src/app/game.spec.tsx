import { render } from '@testing-library/react';

import Game from './game';
import { ReactNode } from 'react';

const gameProviderMockedName = 'MockedGameProvider';
vi.mock('./game-context', () => ({
  GameProvider: ({ children }: { children: ReactNode }) => (
    <div>
      <div>{gameProviderMockedName}</div>
      <div>{children}</div>
    </div>
  ),
}));

const boardMockedName = 'MockedBoard';
vi.mock('./board', () => ({
  default: () => <div>{boardMockedName}</div>,
}));

const gameActionsMockedName = 'MockedGameActions';
vi.mock('./game-actions', () => ({
  default: () => <div>{gameActionsMockedName}</div>,
}));

describe('Game', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Game />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the correct styles', () => {
    const { container } = render(<Game />);
    expect(container).toMatchSnapshot();
  });

  it('should display GameProvider component', () => {
    const { getByText } = render(<Game />);
    expect(getByText(gameProviderMockedName)).toBeTruthy();
  });

  it('should display Board component', () => {
    const { getByText } = render(<Game />);
    expect(getByText(boardMockedName)).toBeTruthy();
  });

  it('should display GameActions component', () => {
    const { getByText } = render(<Game />);
    expect(getByText(gameActionsMockedName)).toBeTruthy();
  });
});
