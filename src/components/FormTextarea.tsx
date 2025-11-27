import React from "react";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  required = false,
  error,
  helperText,
  id,
  className = "",
  ...props
}) => {
  const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${textareaId}-error` : undefined;
  const helperId = helperText ? `${textareaId}-helper` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      <textarea
        id={textareaId}
        aria-required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : helperId}
        className={`w-full px-4 py-3 border ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
        } rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none ${className}`}
        {...props}
      />
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

