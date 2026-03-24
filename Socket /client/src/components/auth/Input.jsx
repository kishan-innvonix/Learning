import React from "react";

const Input = ({ id, label, type, error, ...rest }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="font-semibold text-sm text-gray-700" htmlFor={id}>
        {label}
      </label>

      <input
        className={`w-72 px-3 py-2 rounded-lg border transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-black
        ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`}
        type={type}
        id={id}
        {...rest}
      />

      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
