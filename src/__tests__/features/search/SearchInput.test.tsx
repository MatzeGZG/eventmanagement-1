```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../../../components/search/SearchInput';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';

describe('SearchInput', () => {
  it('handles user input', async () => {
    const onChange = vi.fn();
    renderWithProviders(
      <SearchInput 
        value=""
        onChange={onChange}
        placeholder="Search..."
      />
    );

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'test');
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('triggers focus and blur events', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    
    renderWithProviders(
      <SearchInput 
        value=""
        onChange={() => {}}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    expect(onFocus).toHaveBeenCalled();

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});
```