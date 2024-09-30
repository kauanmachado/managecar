import React from "react";

const Input = React.forwardRef(({ type = "text", name = "", label = "", helperText = "", ...props }, ref) => {
  return (
    <div className="mt-2 flex flex-col justify-center">
      <label htmlFor={name} className="text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name} // Associa o `label` corretamente ao `input`
        {...props}
        ref={ref} // O `ref` agora é corretamente passado ao input
        className="flex rounded-lg shadow bg-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {helperText && <span className="text-red-400">{helperText}</span>}
    </div>
  );
});

export default Input;
