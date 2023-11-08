import { render } from '@testing-library/react';
import { BoardCellProps } from './board-cell';
import BoardRow from './board-row';
import { INITIAL_POSITIONS } from './test-utils';

const nullFunction = () => null;

vi.mock('./utils', async (importActual) => {
  const actual = (await importActual()) as typeof import('./utils');
  return {
    ...actual,
    isEmpty: () => false,
    COLUMNS: ['a', 'b', 'c'],
  };
});

vi.mock('react', async (importActual) => {
  const actual = (await importActual()) as typeof import('react');
  return {
    ...actual,
    useContext: () => ({
      positions: INITIAL_POSITIONS,
      selectedPosition: undefined,
      onClickPosition: nullFunction,
    }),
  };
});

vi.mock('./board-cell', () => ({
  default: (props: BoardCellProps) =>
    `MockedBoardCell ${JSON.stringify(props)} onClick: ${props.onClick}`,
}));

describe('BoardRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoardRow startPosition={0} />);
    expect(baseElement).toBeTruthy();
  });

  it('should display one BoardCell per column', () => {
    const { container } = render(<BoardRow startPosition={0} />);
    expect(container).toMatchSnapshot();
  });

  describe('should pass the correct params to BoardCells', () => {
    it('when starting a different row', () => {
      const { container } = render(<BoardRow startPosition={1} />);
      expect(container).toMatchSnapshot();
    });
    it('when selectedPosition is set', () => {
      vi.mock('react', async (importActual) => {
        const actual = (await importActual()) as typeof import('react');
        return {
          ...actual,
          useContext: () => ({
            positions: INITIAL_POSITIONS,
            selectedPosition: 0,
            onClickPosition: nullFunction,
          }),
        };
      });
      const { container } = render(<BoardRow startPosition={0} />);
      expect(container).toMatchSnapshot();
    });
    it('when positions are empty and no selectedPosition', () => {
      vi.mock('./utils', async (importActual) => {
        const actual = (await importActual()) as typeof import('./utils');
        return {
          ...actual,
          isEmpty: () => true,
          COLUMNS: ['a', 'b', 'c'],
        };
      });
      vi.mock('react', async (importActual) => {
        const actual = (await importActual()) as typeof import('react');
        return {
          ...actual,
          useContext: () => ({
            positions: INITIAL_POSITIONS,
            selectedPosition: undefined,
            onClickPosition: nullFunction,
          }),
        };
      });
      const { container } = render(<BoardRow startPosition={0} />);
      expect(container).toMatchSnapshot();
    });
  });
});
