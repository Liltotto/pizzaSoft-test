import { useRef, useState } from "react";

interface Props {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

const MySelector = ({ options, selectedOption, onOptionSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative inline-block">
      <div
        className={`flex justify-between  items-center appearance-none cursor-pointer w-full bg-[#D6DAE0] text-[#888F99] px-[10px] py-[6px] rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
          isOpen ? "rounded-b-none" : "rounded-b-md"
        }`}
        onClick={toggleDropdown}
      >
        <span className="text-[13px] font-normal leading-4 tracking-[0%]">
          {selectedOption}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          width="17"
          height="10"
          viewBox="0 0 17 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.28033 9.28033C8.98744 9.57322 8.51256 9.57322 8.21967 9.28033L0.71967 1.78033C0.426777 1.48744 0.426777 1.01256 0.71967 0.719671C1.01256 0.426777 1.48744 0.426777 1.78033 0.719671L8.75 7.68934L15.7197 0.71967C16.0126 0.426777 16.4874 0.426777 16.7803 0.71967C17.0732 1.01256 17.0732 1.48744 16.7803 1.78033L9.28033 9.28033Z"
            fill="#1E293B"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute max-h-[250px] overflow-auto z-10 left-0 w-full bg-[#D6DAE0] rounded-b-md p-text block appearance-none text-[#888F99]  rounded leading-tight focus:outline-none focus:shadow-outline rounded-t-none">
          {options.map((option, index) => (
            <div
              key={index}
              className="user-select-none cursor-pointer pl-[10px] py-[6px] hover:bg-gray-100 last:rounded-b-md text-[13px] font-normal leading-4 tracking-[0%]"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySelector;
