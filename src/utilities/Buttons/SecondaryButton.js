import React from "react";

const SecondaryButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:border-2 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {props.buttonText || "Cancel"}
    </button>
  );
};

export default SecondaryButton;
