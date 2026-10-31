import { STATES } from "../data/states";

interface Props {
  id: string;
  value: string | null;
  onChange: (code: string | null) => void;
  label?: string;
  placeholder?: string;
  short?: boolean;
  exclude?: string | null;
}

export default function StateSelect({ id, value, onChange, label, placeholder = "Choose a state", short, exclude }: Props) {
  return (
    <span className="select-wrap">
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <select
        id={id}
        className="select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">{short ? "State" : placeholder}</option>
        {STATES.filter((s) => s.code !== exclude).map((s) => (
          <option key={s.code} value={s.code}>
            {short ? s.code : s.name}
          </option>
        ))}
      </select>
    </span>
  );
}
