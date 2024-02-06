import React from "react";

type Props = {
  type: string;
  placeholder: string;
  ariaLabel: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputForm({ type, placeholder, ariaLabel, onChange, value }: Props) {
  return (
    <div className="w-full mt-4">
      <input
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
}

export default InputForm;
