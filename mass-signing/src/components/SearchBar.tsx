import { Magnifier } from '@ds/icons'

interface SearchBarProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
}

/** Поисковая строка из макета: 32px, без лейбла — в UI-ките отдельного компонента нет */
export function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="ds-icon ds-icon--18 search-bar__icon" aria-hidden="true">
        <Magnifier />
      </span>
      <input
        className="search-bar__field ts-400-m"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
