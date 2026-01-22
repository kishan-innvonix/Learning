import React from "react";

const Input = ({ id, label, type , ...rest}) => {

    return (
    <div className="flex flex-col w-full">
      <label className="font-bold" htmlFor={id}>{label}</label>
      <input className="border rounded px-2 py-1" type={type} id={id} {...rest} />
    </div>
  );
};

export default Input;
