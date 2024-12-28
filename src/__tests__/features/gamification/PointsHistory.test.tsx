```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { PointsHistory } from '../../../features/gamification/components/PointsHistory';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('PointsHistory', () => {
  const mockTransactions = [
    {
      id: '1',
      amount: 50,
      description: 'Event attendance',
      timestamp: new Date()
    },
    {
      id: '2',
      amount: -20,
      description: 'Event boost',
      timestamp: new Date()
    }
  ];

  it('displays point transactions', () => {
    renderWithProviders(<PointsHistory transactions={mockTransactions} />);
    
    expect(screen.getByText('Event attendance')).toBeInTheDocument();
    expect(screen.getByText('Event boost')).toBeInTheDocument();
  });

  it('shows positive and negative amounts correctly', () => {
    renderWithProviders(<PointsHistory transactions={mockTransactions} />);
    
    expect(screen.getByText('+50')).toBeInTheDocument();
    expect(screen.getByText('-20')).toBeInTheDocument();
  });

  it('sorts transactions by date', () => {
    const transactions = [
      {
        id: '1',
        amount: 10,
        description: 'Old transaction',
        timestamp: new Date('2024-01-01')
      },
      {
        id: '2',
        amount: 20,
        description: 'New transaction',
        timestamp: new Date('2024-02-01')
      }
    ];

    renderWithProviders(<PointsHistory transactions={transactions} />);
    
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('New transaction');
    expect(items[1]).toHaveTextContent('Old transaction');
  });
});
```