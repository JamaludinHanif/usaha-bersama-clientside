import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const InputProducts = ({ onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption); // Kirim nilai ke komponen induk
  };

  return (
    <>
      <div>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Select a flavor"
        />
      </div>
    </>
  );
};

export default InputProducts;
