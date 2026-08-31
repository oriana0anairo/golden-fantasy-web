import type { ButtonHTMLAttributes } from 'react';
import { buttonClasses, type ButtonVariant } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonClasses(variant, fullWidth)} ${className}`.trim()}
      {...rest}
    />
  );
}
