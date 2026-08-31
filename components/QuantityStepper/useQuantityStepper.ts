type UseQuantityStepperArgs = {
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
};

/** Clampa el valor entre `min` y `max`, y expone si cada botón debe deshabilitarse. */
export function useQuantityStepper({ value, min, max, onChange }: UseQuantityStepperArgs) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return {
    decrement: () => set(value - 1),
    increment: () => set(value + 1),
    canDecrement: value > min,
    canIncrement: value < max,
  };
}
