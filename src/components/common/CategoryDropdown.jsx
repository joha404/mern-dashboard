import React, { useEffect } from "react";
import Select from "react-select";
import { useController } from "react-hook-form";

function CategoryDropdown({ control, categories }) {
  // useEffect(() => {
  //   console.log(categories);
  // }, []);
  const {
    field: { onChange, value, ref },
  } = useController({
    name: "category",
    control,
    defaultValue: null,
  });

  const options = categories.map((cat) => ({
    value: cat.name,
    label: cat.name,
  }));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <Select
        inputRef={ref}
        options={options}
        value={options.find((option) => option.value === value) || null}
        onChange={(selected) => onChange(selected ? selected.value : null)}
        isClearable
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select a category"
      />
    </div>
  );
}

export default CategoryDropdown;
