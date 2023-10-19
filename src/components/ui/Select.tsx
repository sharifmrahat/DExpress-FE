"use client";
import React, { useState } from "react";

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  selectedValue: string;
  handleChange: any;
};

export default function Select({
  label,
  name,
  value,
  options,
  handleChange,
  selectedValue,
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-xs text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        id={label.toLowerCase()}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        defaultValue={value}
        className="w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded border border-gray-200 bg-white px-5 py-1 text-gray-700 focus:outline-none focus:none text-xs"
      >
        {options.map((e, i) => (
          <option key={i} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}
