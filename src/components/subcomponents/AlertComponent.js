import React, { memo } from "react";
import PropTypes from "prop-types";

function AlertComponent({ alert, handleAlert }) {
    const { message, show, success } = alert;

    if (!show) return null;

    return (
        <div
            className={`alert ${success ? "alert-success" : "alert-error"}`}
            role="alert"
        >
            <div className="flex">
                <span className="title-class flex items-center">
                    {success ? "Success" : "Error"}
                </span>
                <div className="flex">
                    <span className="ml-2">{message}</span>
                    <span className="ml-2 cursor-pointer" onClick={handleAlert}>
                        x
                    </span>
                </div>
            </div>
        </div>
    );
}

export default memo(AlertComponent);
