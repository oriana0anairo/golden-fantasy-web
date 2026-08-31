import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { FIELD_INPUT, FIELD_INPUT_INVALID, FIELD_LABEL, FIELD_WRAPPER } from './TextField.styles';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
};

/**
 * Input aislado en su propio componente: el estado de escritura queda contenido
 * aquí y no propaga renders al formulario completo (ver skill state-performance).
 */
export function TextField({ label, invalid = false, className = '', ...rest }: TextFieldProps) {
  const generatedId = useId();
  const inputId = rest.id ?? generatedId;

  return (
    <div className={FIELD_WRAPPER}>
      <label htmlFor={inputId} className={FIELD_LABEL}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={invalid || undefined}
        className={`${FIELD_INPUT} ${invalid ? FIELD_INPUT_INVALID : ''} ${className}`.trim()}
        {...rest}
      />
    </div>
  );
}
