import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ label, placeholder, type = 'text' }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label
        className="text-sm font-medium text-neutral-700 mb-1"
        style={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18.75px',
          textAlign: 'left',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        style={{
          color: '#000000',
          textAlign: 'left',
        }}
      />
    </div>
  );
};

// Define propTypes for InputField
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default InputField;
