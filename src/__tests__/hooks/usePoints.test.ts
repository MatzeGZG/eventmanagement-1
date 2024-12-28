import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePoints } from '../../hooks/usePoints';
import { useStore } from '../../store';

describe('usePoints', () => {
  beforeEach(() => {
    useStore.setState({ points: 0, xp: 0 });
  });

  it('awards points correctly', () => {
    const { result } = renderHook(() => usePoints());

    act(() => {
      result.current.awardPoints(50);
    });

    const state = useStore.getState();
    expect(state.points).toBe(50);
  });

  it('handles event attendance points', () => {
    const { result } = renderHook(() => usePoints());

    act(() => {
      result.current.handleEventAttendance();
    });

    const state = useStore.getState();
    expect(state.points).toBeGreaterThan(0);
  });

  it('applies point multiplier based on level', () => {
    useStore.setState({ level: 'PassionPioneer' });
    const { result } = renderHook(() => usePoints());

    act(() => {
      result.current.awardPoints(100);
    });

    const state = useStore.getState();
    expect(state.points).toBe(400); // 4x multiplier for PassionPioneer
  });
});