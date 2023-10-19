type InputProps = {
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
};
const Input = ({
  type = "text",
  label,
  value = "",
  placeholder = `Enter your ${label}`,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={label?.toLowerCase()}
        className="block text-xs text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded border border-gray-200 bg-white px-5 py-1 text-gray-700 focus:outline-none focus:none text-xs"
      />
    </div>
  );
};

export default Input;
