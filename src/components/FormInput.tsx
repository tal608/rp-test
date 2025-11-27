import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  required = false,
  error,
  helperText,
  icon,
  id,
  className = "",
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          aria-required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperId}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
          } rounded-xl focus:outline-none focus:ring-2 transition-colors ${className}`}
          {...props}
        />
      </div>
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

