import React from "react";
import closeIcon from "../../assets/closeIcon.png";
import tickIcon from "../../assets/tickIcon.png";
import cropIcon from "../../assets/cropIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import brockenImage from "../../assets/brockenImage.png";

function FileItem(props) {
    const { image, index, deleteImage, handleCheckImage, cropImageHandle } =
        props;
    const { format, url, file, progress, size, showSuccess, checked } = image;
    let imageURL =
        format === "jpg" || format === "png"
            ? url || URL.createObjectURL(file)
            : brockenImage;
    const fileSizeMB = (file?.size / 1024 / 1024).toFixed(2);
    // const isFileSizeValid = fileSizeMB <= 5;
    const isImageFormatValid = format === "jpg" || format === "png";
    const isFileSizeTooLarge = fileSizeMB > 5;

    if (isFileSizeTooLarge) {
        imageURL = brockenImage;
    }

    return (
        <div className="flex flex-row justify-between mt-2">
            <div className="w-2/12">
                <img
                    src={imageURL}
                    alt={`Uploaded ${index}`}
                    className="rounded-lg"
                    style={{ width: "80px", height: "80px" }}
                />
            </div>
            <div className="w-9/12 flex flex-col justify-between px-2">
                <div className="file-name">{image?.name || file.name}</div>
                <div className="file-size">
                    {size
                        ? `${(size / 1024 / 1024).toFixed(2)} MB`
                        : `${fileSizeMB} MB`}
                </div>
                {isImageFormatValid ? (
                    isFileSizeTooLarge ? (
                        <p className="text-red-500 small-text">
                            This image is larger than 5MB. Please select a
                            smaller image.
                        </p>
                    ) : progress === 100 ? (
                        <div className="flex flex-row">
                            {showSuccess ? (
                                <div className="group flex flex-row items-center">
                                    <img
                                        src={tickIcon}
                                        alt="tickIcon"
                                        className="w-4"
                                    />
                                    <span className="text-green-500 small-text">
                                        Upload success!
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between cursor-pointer">
                                    <div
                                        className="group flex flex-row items-center"
                                        onClick={() => cropImageHandle(index)}
                                    >
                                        <img
                                            src={cropIcon}
                                            alt="cropIcon"
                                            className="w-4 group-hover:text-black"
                                        />
                                        <span className="progress-span group-hover:text-black">
                                            Crop Image
                                        </span>
                                    </div>
                                    <div
                                        className="group flex flex-row items-center ml-2"
                                        onClick={() => deleteImage(index)}
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt="deleteIcon"
                                            className="w-4 group-hover:text-black"
                                        />
                                        <span className="progress-span group-hover:text-black">
                                            Delete
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <progress
                            value={progress}
                            max="100"
                            className="w-full h-1 bg-blue-500 rounded-md overflow-hidden"
                        ></progress>
                    )
                ) : (
                    <p className="text-red-500 small-text">
                        {`The file format of ${image?.name} is not supported. Please upload an image in one of the following formats: JPG or PNG.`}
                    </p>
                )}
            </div>
            <div className="w-1/12 text-end flex flex-col justify-between items-end">
                {progress === 100 ? (
                    isImageFormatValid ? (
                        isFileSizeTooLarge ? null : (
                            <div>
                                <input
                                    type="radio"
                                    id={`image-${index}`}
                                    name={`image-${index}`}
                                    onChange={() =>
                                        handleCheckImage(image, index)
                                    }
                                    checked={checked}
                                    style={{ display: "block" }}
                                    className="radio-button"
                                />
                            </div>
                        )
                    ) : null
                ) : (
                    <div>
                        <img
                            src={closeIcon}
                            alt={`closeIcon`}
                            onClick={() => deleteImage(index)}
                            className="cursor-pointer"
                        />
                    </div>
                )}
                <span className="progress-span">
                    {isImageFormatValid
                        ? isFileSizeTooLarge
                            ? null
                            : progress < 100
                            ? `${progress} %`
                            : ""
                        : null}
                </span>
            </div>
        </div>
    );
}

export default FileItem;
