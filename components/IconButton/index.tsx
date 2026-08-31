import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ICON_SIZE_PX, iconButtonClasses, type IconButtonSize, type IconButtonVariant } from './IconButton.styles';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Cuando se pasa, se renderiza como enlace en vez de botón. */
  href?: string;
};

/** Control cuadrado/circular solo-ícono para utilidades de header y cierres de diálogo. */
export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  type = 'button',
  href,
  ...rest
}: IconButtonProps) {
  const classes = `${iconButtonClasses(variant, size)} ${className}`.trim();
  const glyph = <Icon size={ICON_SIZE_PX[size]} strokeWidth={1.5} aria-hidden="true" />;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {glyph}
      </Link>
    );
  }

  return (
    <button type={type} aria-label={label} className={classes} {...rest}>
      {glyph}
    </button>
  );
}
