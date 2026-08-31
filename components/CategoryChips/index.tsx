import { ACTIVE, IDLE, ROW } from './CategoryChips.styles';

type CategoryChipsProps = {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
};

/** Chips de filtro de categoría del catálogo. */
export function CategoryChips({ categories, active, onSelect }: CategoryChipsProps) {
  return (
    <div className={ROW}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={category === active ? ACTIVE : IDLE}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
