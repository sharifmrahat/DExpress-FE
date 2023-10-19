// DatePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  label: string;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  handleDateChange,
}) => {
  return (
    <div>
      <label
        htmlFor={label?.toLowerCase()}
        className="block text-xs text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy h:mm aa" // Include time format
        showTimeSelect // Enable time selection
        timeFormat="HH:mm" // Customize time format
        timeIntervals={15} // Set time intervals
        timeCaption="Time" // Customize time label
        popperPlacement="bottom-start"
        isClearable
        className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded border border-gray-200 bg-white px-5 py-1 text-gray-700 focus:outline-none focus:none text-xs"
      />
    </div>
  );
};

export default CustomDatePicker;
