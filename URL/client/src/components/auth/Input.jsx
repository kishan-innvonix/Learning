import React from "react";

const Input = ({ id, label, type, error, ...rest }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`${error && "outline-none border-red-500 border-2"} border rounded px-2 py-1`}
        type={type}
        id={id}
        {...rest}
      />
      <p className={`${!error && "hidden"} text-red-700 rounded`}>
        {error?.message}
      </p>
    </div>
  );
};

export default Input;
