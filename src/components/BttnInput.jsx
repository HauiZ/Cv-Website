import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faEnvelope } from "../utils/fontAwsomeLib"; // default icon

const Input = React.forwardRef(({ title, type, icon, errors, ...rest }, ref) => {
  const name = rest.name; // name sẽ được lấy từ register()

  return (
    <>
      <label htmlFor={name} className="block mb-2">{title}</label>
      <div className="relative mb-[4vh]">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <FontAwesomeIcon
            icon={icon}
            className="text-green-500"
          />
        </span>
        <input
          type={type}
          className="bg-yellow border rounded w-full h-[5vh] pl-10 pr-3 min-h-[40px] max-w-[500px] max-sm:min-h-[50px]"
          ref={ref}
          {...rest} // chứa name, onChange, ref,... từ register()
        />
      </div>
      {errors?.[name] && <p className="text-red-500 mt-[-3vh]">{errors[name].message}</p>}
    </>
  );
});

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
