import React, { memo } from "react";
import PropTypes from "prop-types";

function AlertComponent({ alert ,handleAlert}) {
    const { message, show, success } = alert;

    if (!show) return null;

    return (
        <div
            className={`alert ${success ? "alert-success" : "alert-error"}`}
            role="alert"
        >
            <span className="title-class">
                {success ? "Success" : "Error"}
            </span>
            <span className="ml-2">{message}</span>
            <span className="ml-2 cursor-pointer" onClick={handleAlert}>x</span>
        </div>
    );
}

export default memo(AlertComponent);
