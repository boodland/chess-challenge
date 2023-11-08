import { renderHook, act } from '@testing-library/react'
import { useGame } from './hooks'
import { INITIAL_FEN } from './utils';
import { INITIAL_POSITIONS, UPDATED_FEN, UPDATED_FEN_OCCUPIED, UPDATED_POSITIONS, UPDATED_POSITIONS_OCCUPIED } from './test-utils';

describe('useGame', () => {
    it('fen should have the initial FEN', () => {
        const { result } = renderHook(useGame);
        expect(result.current.fen).toBe(INITIAL_FEN);
    });

    it('positions should have the initial positions', () => {
        const { result } = renderHook(useGame);
        expect(result.current.positions).toEqual(INITIAL_POSITIONS);
    });

    it('selectedPosition should be undefined', () => {
        const { result } = renderHook(useGame);
        expect(result.current.selectedPosition).toBeUndefined();
    });

    describe('updateFen should', () => {
        afterEach(() => localStorage.clear());
        it('update fen and positions', () => {
            const { result } = renderHook(useGame);
            expect(result.current.fen).toBe(INITIAL_FEN);
            act(() => result.current.updateFen(UPDATED_FEN));
            expect(result.current.fen).toBe(UPDATED_FEN);
            expect(result.current.positions).toEqual(UPDATED_POSITIONS);
        });
        it('store fen locally', () => {
            const { result, rerender } = renderHook(useGame);
            expect(result.current.fen).toBe(INITIAL_FEN);
            act(() => result.current.updateFen(UPDATED_FEN));
            expect(result.current.positions).toEqual(UPDATED_POSITIONS);
            expect(result.current.fen).toBe(UPDATED_FEN);
            rerender();
            expect(result.current.fen).toBe(UPDATED_FEN);
            expect(result.current.positions).toEqual(UPDATED_POSITIONS);
        });
    });

    describe('onClickPosition should', () => {
        it('not update selectedPosition if position is empty and selectedPosition is undefined', () => {
            const { result } = renderHook(useGame);
            expect(result.current.selectedPosition).toBeUndefined();
            act(() => result.current.onClickPosition(16));
            expect(result.current.selectedPosition).toBeUndefined();
        });
        it('update selectedPosition if position is not empty and selectedPosition is undefined', () => {
            const positionClicked = 0;
            const { result } = renderHook(useGame);
            expect(result.current.selectedPosition).toBeUndefined();
            act(() => result.current.onClickPosition(positionClicked));
            expect(result.current.selectedPosition).toBe(positionClicked);
        });
        it('unselect position if position is the same than selectedPosition', () => {
            const position = 0;
            const { result } = renderHook(useGame);
            expect(result.current.selectedPosition).toBeUndefined();
            act(() => result.current.onClickPosition(position));
            expect(result.current.selectedPosition).toBe(position);
            act(() => result.current.onClickPosition(position));
            expect(result.current.selectedPosition).toBeUndefined();
        });
        it('update selectedPosition if position piece is the same color than selectedPosition', () => {
            const position = 0;
            const { result } = renderHook(useGame);
            expect(result.current.selectedPosition).toBeUndefined();
            act(() => result.current.onClickPosition(position));
            expect(result.current.selectedPosition).toBe(position);
            const sameColorPosition = 1;
            act(() => result.current.onClickPosition(sameColorPosition));
            expect(result.current.selectedPosition).toBe(sameColorPosition);
        });
        describe('move selectedPosition to position', () => {
            afterEach(() => localStorage.clear());
            it('if position is empty', () => {
                const position = 50;
                const { result } = renderHook(useGame);
                expect(result.current.selectedPosition).toBeUndefined();
                act(() => result.current.onClickPosition(position));
                expect(result.current.selectedPosition).toBe(position);
                const emptyPositionClicked = 42;
                act(() => result.current.onClickPosition(emptyPositionClicked));
                expect(result.current.selectedPosition).toBeUndefined();
                expect(result.current.positions).toEqual(UPDATED_POSITIONS);
                expect(result.current.fen).toBe(UPDATED_FEN);
            });
            it('if position is different color', () => {
                const position = 56;
                const { result } = renderHook(useGame);
                expect(result.current.selectedPosition).toBeUndefined();
                act(() => result.current.onClickPosition(position));
                expect(result.current.selectedPosition).toBe(position);
                const otherColorPosition = 0;
                act(() => result.current.onClickPosition(otherColorPosition));
                expect(result.current.selectedPosition).toBeUndefined();
                expect(result.current.positions).toEqual(UPDATED_POSITIONS_OCCUPIED);
                expect(result.current.fen).toBe(UPDATED_FEN_OCCUPIED);
            });
        });
    });
});