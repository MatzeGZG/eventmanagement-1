import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Loading',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    'aria-label': 'Loading',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Loading',
  },
};