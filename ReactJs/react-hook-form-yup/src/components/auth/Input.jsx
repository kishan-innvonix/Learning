const Input = ({ label, id, type, value, register, fieldName }) => {
  return (
    <>
        <label className="my-1" htmlFor={id}>{label}</label>
        <input
          className="bg-gray-50 border mx-1 border-red-900"
          type={type}
          id={id}
          value={value}
          {...register(fieldName)}
        />
    </>
  );
};

export default Input;
