type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputSearch({ value, onChange }: Props) {
  return (
    <input
      className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      onChange={onChange}
      placeholder="search"
      value={value}
      type="text"
    />
  );
}

export default InputSearch;
