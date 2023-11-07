import { fireEvent, getByRole, render } from '@testing-library/react';

import BoardCell from './board-cell';
import { CellTypeEnum } from './utils';
import { EMPTY_HANDLER, EMPTY_PIECE, PieceShape } from './test-utils';

describe('BoardCell', () => {
  it('should render successfully', () => {
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.dark}
        onClick={EMPTY_HANDLER}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should display light cell when type is light', () => {
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.light}
        onClick={EMPTY_HANDLER}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display dark cell when type is dark', () => {
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.dark}
        onClick={EMPTY_HANDLER}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display blocked cell when is blocked', () => {
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.dark}
        blocked={true}
        onClick={EMPTY_HANDLER}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display selected cell when is selected', () => {
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.dark}
        selected={true}
        onClick={EMPTY_HANDLER}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should display the correct piece text for each piece', () => {
    Object.entries(PieceShape).forEach(([piece, shape]) => {
      const { container } = render(
        <BoardCell
          piece={piece}
          type={CellTypeEnum.dark}
          onClick={EMPTY_HANDLER}
        />
      );
      const button = getByRole(container, 'button');
      expect(button.textContent).toEqual(shape);
    });
  });

  it('should call onCellClick when clicking the cell', () => {
    const onCellClickSpy = vi.fn();
    const { container } = render(
      <BoardCell
        piece={EMPTY_PIECE}
        type={CellTypeEnum.light}
        onClick={onCellClickSpy}
      />
    );
    const button = getByRole(container, 'button');
    fireEvent.click(button);
    expect(onCellClickSpy).toHaveBeenCalledOnce();
  });
});
