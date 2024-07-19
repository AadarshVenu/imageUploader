import React, { useRef, useState } from "react";
import uploadIcon from "../../assets/uploadIcon.png";

function FileInput({ onChangeFileInput, selectedImagesLength }) {
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleFileInputChange = (event) => {
        const files = Array.from(event.target.files);
        onChangeFileInput(files);
    };

    const handleClickDiv = () => {
        fileInputRef.current.click();
    };

    const dragHandler = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const dragOverHandler = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const dropHandler = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = Array.from(event.dataTransfer.files);
        onChangeFileInput(files);
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className="hidden"
                accept=".png, .jpg"
                multiple
                disabled={selectedImagesLength >= 5}
            />
            <div
                onClick={selectedImagesLength >= 5 ? null : handleClickDiv}
                onDragEnter={selectedImagesLength >= 5 ? null : dragHandler}
                onDragLeave={
                    selectedImagesLength >= 5 ? null : dragLeaveHandler
                }
                onDragOver={selectedImagesLength >= 5 ? null : dragOverHandler}
                onDrop={selectedImagesLength >= 5 ? null : dropHandler}
                className={`flex flex-col items-center justify-center w-full  ${
                    selectedImagesLength === 5
                        ? "h-40 cursor-not-allowed"
                        : "h-40 cursor-pointer"
                } border rounded-lg  ${
                    dragging ? "border-blue-600" : "border-gray-300"
                } hover:bg-gray-100 text-center`}
            >
                {selectedImagesLength >= 5 ? (
                    <div>
                        <div className="text-red-600">
                            You've reached the image limit
                        </div>
                        <div className="text-gray-500 text-sm mt-1">
                            Remove one or more to upload more images.
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <img src={uploadIcon} alt="uploadIcon" />
                        </div>
                        <br />
                        <div className="font-semibold">
                            Click or drag and drop to Upload
                        </div>
                        <div className="text-gray-500 text-sm mt-1">
                            PNG or JPG (Max 5 MB each)
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileInput;
