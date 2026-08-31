import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BUTTON_ICON_SIZE_PX, buttonClasses, type ButtonSize, type ButtonVariant } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonClasses(variant, size, fullWidth)} ${className}`.trim()}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon size={BUTTON_ICON_SIZE_PX} strokeWidth={1.5} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={BUTTON_ICON_SIZE_PX} strokeWidth={1.5} aria-hidden="true" />}
    </button>
  );
}
