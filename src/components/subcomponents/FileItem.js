import React from "react";
import closeIcon from "../../assets/closeIcon.png";
import tickIcon from "../../assets/tickIcon.png";
import cropIcon from "../../assets/cropIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import brockenImage from "../../assets/brockenImage.png";

function FileItem(props) {
    const { image, index, deleteImage, handleCheckImage } = props;

    return (
        <div className="flex flex-row justify-between mt-2">
            <div className="w-2/12">
                <img
                    src={
                        image?.format === "jpg" || image?.format === "png"
                            ? URL.createObjectURL(image.file)
                            : brockenImage
                    }
                    alt={`Uploaded ${index}`}
                    className="rounded-lg"
                    style={{ width: "80px", height: "80px" }}
                />
            </div>
            <div className="w-9/12 flex flex-col justify-between px-2">
                <div className="file-name">{image.file.name}</div>
                <div className="file-size">
                    {image.file.size &&
                        (image.file.size / 1024 / 1024).toFixed(2)}{" "}
                    MB
                </div>
                {image?.format !== "jpg" && image?.format !== "png" ? (
                    <p className="text-red-500 small-text">
                        {`The file format of ${image.file.name} is not supported. Please upload an image in one of the following formats: JPG or PNG.`}
                    </p>
                ) : image.file.size &&
                  (image.file.size / 1024 / 1024).toFixed(2) > 5 ? (
                    <p className="text-red-500 small-text">
                        This image is larger than 5MB. Please select a smaller
                        image.
                    </p>
                ) : image.progress === 100 ? (
                    <div className="flex flex-row">
                        {image.showSuccess ? (
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
                                <div className="group flex flex-row items-center">
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
                                    className="group flex flex-row items-center ml-2 "
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
                        value={image.progress}
                        max="100"
                        className="w-full h-1 bg-blue-500 rounded-md overflow-hidden"
                    ></progress>
                )}
            </div>
            <div className="w-1/12 text-end flex flex-col justify-between items-end">
                {image.progress === 100 ? (
                    <div>
                        {image?.format !== "jpg" &&
                        image?.format !== "png" ? null : (
                            <div>
                                {(image.file.size / 1024 / 1024).toFixed(2) >
                                5 ? (
                                    <img
                                        src={closeIcon}
                                        alt={`closeIcon`}
                                        onClick={() => deleteImage(index)}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        id={`image-${index}`}
                                        name={`image-${index}`}
                                        onChange={() =>
                                            handleCheckImage(image, index)
                                        }
                                        checked={image.checked ? true : false}
                                        style={{
                                            display:
                                                image.file.size &&
                                                (
                                                    image.file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2) > 5
                                                    ? "none"
                                                    : "block",
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
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
                    {image?.format !== "jpg" &&
                    image?.format !== "png" ? null : (
                        <div>
                            {image.file.size &&
                            (image.file.size / 1024 / 1024).toFixed(2) > 5 ? (
                                <span></span>
                            ) : (
                                <span>
                                    {image.progress < 100
                                        ? `${image.progress} %`
                                        : ""}
                                </span>
                            )}
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}

export default FileItem;
