import React from "react";
import Select from "react-select";

export default function CustomSelect({ onChange, options, value, className }) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className="relative text-black">
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
      />
    </div>
  );
}
