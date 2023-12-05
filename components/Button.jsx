import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { children, label, variant, className } = props;

  if (variant === 'primary') {
    return (
      <button
        {...props}
        className={`btn btn-sm bg-[#1996a4] border-[#1996a4] text-white hover:border-[#70CBCF] hover:text-[#183538] hover:bg-[#70CBCF] h-10 ${className} `}
      >
        {children}
      </button>
    );
  } else if (variant === 'secondary') {
    return (
      <button
        {...props}
        className={`btn btn-sm btn-outline text-[#1996a4] border-[#1996a4] hover:bg-[#1996a4] hover:border-[#1996a4] ${className} h-10`}
      >
        {children}
      </button>
    );
  } else {
    return '';
  }
}

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
};
