import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  fieldInputClasses,
  FIELD_INPUT_INVALID,
  FIELD_LABEL,
  FIELD_LABEL_HIDDEN,
  FIELD_WRAPPER,
  ICON,
  ICON_WRAPPER,
} from './TextField.styles';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
  icon?: LucideIcon;
  /** Oculta el label visualmente (queda accesible para lectores de pantalla). */
  hideLabel?: boolean;
};

/**
 * Input aislado en su propio componente: el estado de escritura queda contenido
 * aquí y no propaga renders al formulario completo (ver skill state-performance).
 */
export function TextField({
  label,
  invalid = false,
  icon: Icon,
  hideLabel = false,
  className = '',
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = rest.id ?? generatedId;

  return (
    <div className={FIELD_WRAPPER}>
      <label htmlFor={inputId} className={hideLabel ? FIELD_LABEL_HIDDEN : FIELD_LABEL}>
        {label}
      </label>
      <span className={ICON_WRAPPER}>
        {Icon && (
          <span className={ICON}>
            <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={invalid || undefined}
          className={`${fieldInputClasses(Boolean(Icon))} ${invalid ? FIELD_INPUT_INVALID : ''} ${className}`.trim()}
          {...rest}
        />
      </span>
    </div>
  );
}
