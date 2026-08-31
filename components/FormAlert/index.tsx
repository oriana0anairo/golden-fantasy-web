import { ALERT_BASE, ALERT_TONES, type AlertTone } from './FormAlert.styles';

type FormAlertProps = {
  message: string | null;
  tone?: AlertTone;
};

/** Mensaje de error/éxito de un formulario. No renderiza nada si no hay mensaje. */
export function FormAlert({ message, tone = 'error' }: FormAlertProps) {
  if (!message) return null;

  return (
    <p role="alert" className={`${ALERT_BASE} ${ALERT_TONES[tone]}`}>
      {message}
    </p>
  );
}
