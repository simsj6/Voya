function AuthPage({ title, buttonLabel, fields, helperLink }) {
  return (
    <section className="form-page">
      <div className="form-panel auth-panel">
        <h1>{title}</h1>

        <div className="stacked-form">
          {fields.map((field) => (
            <label key={field.label} className="field">
              <span className="form-label">{field.label}</span>
              <input
                type={field.type || 'text'}
                defaultValue={field.value}
                placeholder={field.placeholder}
              />
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button className="planner-button auth-submit" type="button">
            {buttonLabel}
          </button>
          {helperLink ? (
            <a className="helper-link" href={`#${helperLink.page}`}>
              {helperLink.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default AuthPage
