import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faEnvelope, faEye, faEyeSlash } from "../utils/fontAwsomeLib";

const Input = React.forwardRef(
  ({ title, type, icon, errors, ...rest }, ref) => {
    const name = rest.name;
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const isPassword = type === "password";

    const handleChange = (e) => {
      setInputValue(e.target.value);
      if (rest.onChange) rest.onChange(e); // để không mất onChange từ register
    };

    return (
      <>
        <label htmlFor={name} className="block mb-2">
          {title}
        </label>
        <div className="relative mb-[4vh]">
          {/* Icon trái */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={icon} className="text-green-500" />
          </span>

          {/* Input */}
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className="bg-yellow border rounded w-full h-[5vh] pl-10 pr-10 min-h-[40px] max-w-[500px] max-sm:min-h-[50px]"
            ref={ref}
            {...rest}
            onChange={handleChange}
          />

          {/* Icon mắt bên phải */}
          {isPassword && inputValue && (
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-green-500"
              />
            </span>
          )}
        </div>

        {/* Hiển thị lỗi */}
        {errors?.[name] && (
          <p className="text-red-500 mt-[-3vh]">{errors[name].message}</p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.object,
  errors: PropTypes.object,
};

Input.defaultProps = {
  title: "Email",
  type: "email",
  icon: faEnvelope,
};

export default Input;
