import { useState } from "react";
import { twMerge } from "tailwind-merge";

const InputField = ({
  label,
  name,
  id,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  isValid = null,
  required = false,
  inputClass,
  containerClass,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value?.length > 0;

  return (
    <div className={twMerge("relative w-full", containerClass)}>
      {/* Input field */}
      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        required={required}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={twMerge(
          `peer w-full text-black placeholder-transparent px-3 py-[.75rem] 
           bg-white border border-border_dark rounded-md 
           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
           transition-all duration-200`,
          isValid === null
            ? "border-border_dark"
            : isValid
            ? "border-green-500"
            : "border-red-500",
          inputClass
        )}
      />

      {/* Label */}
      <label
        htmlFor={name}
        className={twMerge(
          `absolute left-3 px-1 bg-white transition-all duration-200 
           text-[#262323] font-[600] pointer-events-none`,
          isFloating ? "-top-2 text-xs" : "top-3"
        )}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
    </div>
  );
};

export default InputField;
