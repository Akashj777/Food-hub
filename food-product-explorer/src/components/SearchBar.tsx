interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="field field-search">
      <label htmlFor="search">Search food, brand, or category</label>
      <input
        id="search"
        type="search"
        placeholder="Try rice, milk, or Tata Sampann"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
