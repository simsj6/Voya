import React from 'react';
import './Field.css';

export default function Field({ label, value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}
