/**
 * Loading spinner component with customizable size
 * @component
 * @example
 * ```tsx
 * <LoadingSpinner size="md" aria-label="Loading content" />
 * ```
 */
interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  // Component implementation remains the same
});