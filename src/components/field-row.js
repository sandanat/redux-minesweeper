import React from 'react';

// row with required cols qty
export default function FieldRow({ children }) {
  return (
    <div className="field-row">
      {children}
    </div>
  );
}