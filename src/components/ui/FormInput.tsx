"use client";
import { useFormContext, Controller } from "react-hook-form";

type InputProps = {
  name: string;
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
};
const FormInput = ({
  name,
  type = "text",
  label,
  value = "",
  placeholder = `Enter your ${label}`,
}: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label
        htmlFor={label?.toLowerCase()}
        className="block text-xs text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
            className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded border border-gray-200 bg-white px-5 py-1 text-gray-700 focus:outline-none focus:none text-xs"
          />
        )}
      />
    </div>
  );
};

export default FormInput;
