import { render } from '@testing-library/react';

import Board from './board';
import { BoardRowProps } from './board-row';

const { ROWS, COLUMNS } = vi.hoisted(() => {
  return { ROWS: [0, 1, 2, 3, 4], COLUMNS: ['a', 'b', 'c'] }
})

vi.mock('./utils', () => {
  return { ROWS, COLUMNS };
});

const mockedComponentName = 'MockedBoardRow';

vi.mock('./board-row', () => ({
  default: (props: BoardRowProps) => (
    <div>{`${mockedComponentName} ${JSON.stringify(props)}`}</div>
  ),
}));

describe('Board', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Board/>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have the correct styles', () => {
    const { container } = render(
      <Board/>
    );
    expect(container).toMatchSnapshot();
  });

  it('should display columns row', () => {
    const { getAllByText } = render(
      <Board/>
    );
    expect(getAllByText(new RegExp('^[abc]$', "i"))).toHaveLength(COLUMNS.length);
  });

  it('should display one BoardRow per row', () => {
    const { getAllByText } = render(
      <Board/>
    );
    expect(getAllByText(mockedComponentName, {exact: false})).toHaveLength(ROWS.length);
  });
});
