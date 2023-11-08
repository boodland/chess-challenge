import { fireEvent, render } from '@testing-library/react';

import GameActions from './game-actions';

const ERROR_MESSAGE = 'The entered FEN string is not valid';

const { INITIAL_FEN, FEN_FROM_CONTEXT, updateFenMocked, isFenValidMocked } = vi.hoisted(() => {
  return {
    INITIAL_FEN: 'The Initial fen',
    FEN_FROM_CONTEXT: 'The context fen',
    updateFenMocked: vi.fn(),
    isFenValidMocked: vi.fn().mockImplementation(() => true),
  };
});

vi.mock('./utils', () => {
  return { INITIAL_FEN, isFenValid: isFenValidMocked };
});

vi.mock('react', async (importActual) => {
  const actual = (await importActual()) as typeof import('react');
  return {
    ...actual,
    useContext: () => ({
      fen: FEN_FROM_CONTEXT,
      updateFen: updateFenMocked,
    }),
  };
});

describe('GameActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameActions />);
    expect(baseElement).toBeTruthy();
  });

  it('should have the correct styles', () => {
    const { container, rerender, getByText } = render(<GameActions />);
    expect(container).toMatchSnapshot();
    isFenValidMocked.mockImplementation(() => false);
    rerender(<GameActions/>)
    const button = getByText('Apply');
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
    isFenValidMocked.mockImplementation(() => true);
  });

  it('should display fen from context in input', () => {
    const { getByDisplayValue } = render(<GameActions />);
    expect(getByDisplayValue(FEN_FROM_CONTEXT)).toBeTruthy();
  });

  it('should set INITIAL_FEN in input value when clicking restart button and call updateFen', () => {
    updateFenMocked.mockClear();
    const { getByText, getByDisplayValue } = render(<GameActions />);
    const button = getByText('Restart');
    fireEvent.click(button);
    expect(getByDisplayValue(INITIAL_FEN)).toBeTruthy();
    expect(updateFenMocked).toHaveBeenCalledOnce();
    expect(updateFenMocked).toHaveBeenCalledWith(INITIAL_FEN);
  });

  it('should call updateFen with input value when clicking Apply button', () => {
    updateFenMocked.mockClear();
    const newFenValue = 'The new fen value';
    const { getByText, getByRole } = render(<GameActions />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: newFenValue } });
    const button = getByText('Apply');
    fireEvent.click(button);
    expect(updateFenMocked).toHaveBeenCalledOnce();
    expect(updateFenMocked).toHaveBeenCalledWith(newFenValue);
    expect(() => getByText(ERROR_MESSAGE)).toThrow();
  });

  it('should display error message if fen is invalid when clicking Apply button', () => {
    updateFenMocked.mockClear();
    isFenValidMocked.mockImplementation(() => false);
    const { getByText } = render(<GameActions />);
    const button = getByText('Apply');
    fireEvent.click(button);
    expect(getByText(ERROR_MESSAGE)).toBeTruthy();
    expect(updateFenMocked).not.toHaveBeenCalled();
  });
});
