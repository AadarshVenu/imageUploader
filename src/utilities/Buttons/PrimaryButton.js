import React from 'react';

const PrimaryButton = (props) => {
	
  const { disabled, onClick, buttonText } = props;
  return (
    <button
      onClick={!disabled ? onClick : null}
      disabled={disabled}
      className={`w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:border-2 focus:z-10 focus:ring-4 ${
        disabled
          ? 'bg-gray-200 text-gray-400 border-gray-200'
          : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-700 dark:hover:bg-blue-700'
      }`}
    >
      {buttonText || 'Select Image'}
    </button>
  );
};

export default PrimaryButton;
