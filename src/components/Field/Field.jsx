import React from 'react';
import './Field.css';

export default function Field({ label, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}