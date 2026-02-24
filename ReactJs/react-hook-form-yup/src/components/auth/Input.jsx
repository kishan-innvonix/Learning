const Input = ({
  type,
  label,
  id,
  register,
  fieldName,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 mb-2">
      
      {/* Label */}
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        type={type}
        value={value}
        {...register(fieldName)}
        className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-400"
          }`}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};

export default Input;