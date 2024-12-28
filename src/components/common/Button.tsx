/**
 * Primary button component with multiple variants and sizes
 * @component
 * @example
 * ```tsx
 * <Button 
 *   variant="primary"
 *   size="md"
 *   icon={<Mail />}
 *   loading={false}
 * >
 *   Send Message
 * </Button>
 * ```
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon component */
  icon?: LucideIcon;
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading,
  fullWidth,
  className = '',
  ...props
}) => {
  // Component implementation remains the same
};