import React from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  required = false,
  error,
  helperText,
  options,
  id,
  className = "",
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${selectId}-error` : undefined;
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      <select
        id={selectId}
        aria-required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : helperId}
        className={`w-full px-4 py-3 border ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
        } rounded-xl focus:outline-none focus:ring-2 transition-colors ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

