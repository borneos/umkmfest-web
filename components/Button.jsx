import React from "react";
import PropTypes from "prop-types";

export default function Button(props) {
  const { label, type, onClick } = props;

  if (type === "primary") {
    return (
      <button className="btn btn-sm bg-[#1996a4] text-white hover:border-[#70CBCF] hover:text-[#183538] hover:bg-[#70CBCF] w-full h-10">
        {label}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button className="btn btn-sm btn-outline text-[#1996a4] border-[#1996a4] hover:bg-[#1996a4] hover:border-[#1996a4] w-full h-10">
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
