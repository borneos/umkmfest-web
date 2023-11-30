import React from "react";
import PropTypes from "prop-types";

export default function Button(props) {
  const { label, type } = props;

  if (type === "primary") {
    return (
      <button className="bg-[#049548] py-1 rounded-lg w-full text-white h-8">
        {label}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button className="border-2 border-[#049548] text-[#049548] py-1 rounded-lg w-full h-8">
        {label}
      </button>
    );
  } else {
    return "";
  }
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
};
