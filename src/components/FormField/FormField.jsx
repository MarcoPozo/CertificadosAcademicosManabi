import './FormField.css'

function FormField({ label, id, type = 'text', value, onChange, options, placeholder, icon: Icon }) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {Icon && <Icon className="form-field__icon" size={14} />}
        {label}
      </label>
      {type === 'select' ? (
        <select
          id={id}
          className="form-field__input form-field__input--select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="form-field__input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

export default FormField
