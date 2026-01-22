import React from "react";

const FormError = ({ errors }) => {
  return (
    Object.values(errors).length !== 0 && (
      <p className="error absolute top-2 text-red-700 bg-red-100 px-3 py-1 rounded">
        {Object.values(errors)[0]?.message}
      </p>
    )
  );
};

export default FormError;
