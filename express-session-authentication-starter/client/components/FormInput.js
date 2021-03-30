import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormInput({
  className,
  onChange,
  value,
  placeholder,
  type,
  leftIcon,
  rightIcon,
}) {
  return (
    <div className={`field ${className}`}>
      <div
        className={`control ${!!leftIcon ? "has-icons-left" : ""} ${
          !!rightIcon ? "has-icons-right" : ""
        }`}
      >
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {leftIcon && (
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}
        {rightIcon && (
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={rightIcon} />
          </span>
        )}
      </div>
    </div>
  );
}

FormInput.defaultProps = {
  className: "",
  leftIcon: undefined,
  rightIcon: undefined,
  type: "text",
};

FormInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  type: PropTypes.string,
};
