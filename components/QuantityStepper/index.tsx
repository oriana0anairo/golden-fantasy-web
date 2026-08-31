import { Minus, Plus } from 'lucide-react';
import { ARROW_BASE, VALUE, WRAPPER } from './QuantityStepper.styles';
import { useQuantityStepper } from './useQuantityStepper';

type QuantityStepperProps = {
  value: number;
  max: number;
  onChange: (next: number) => void;
  min?: number;
};

/** Selector +/- de cantidad, usado en el detalle de producto (tope fijo de v1: 5 unidades). */
export function QuantityStepper({ value, max, onChange, min = 1 }: QuantityStepperProps) {
  const { decrement, increment, canDecrement, canIncrement } = useQuantityStepper({ value, min, max, onChange });

  return (
    <div className={WRAPPER}>
      <button type="button" aria-label="Quitar uno" disabled={!canDecrement} onClick={decrement} className={ARROW_BASE}>
        <Minus size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <span className={VALUE}>{value}</span>
      <button type="button" aria-label="Agregar uno" disabled={!canIncrement} onClick={increment} className={ARROW_BASE}>
        <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}
