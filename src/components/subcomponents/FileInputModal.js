import React, { memo } from "react";
import Modal from "../../utilities/Modal/Modal";
import FileInput from "../../utilities/FileInput/FileInput";
import FileItem from "./FileItem";
import SecondaryButton from "../../utilities/Buttons/SecondaryButton";
import PrimaryButton from "../../utilities/Buttons/PrimaryButton";
import ImageCropper from "./ImageCropper";

function FileInputModal(props) {
    const {
        modalOpen,
        handleModal,
        onChangeFileInput,
        selectedImages,
        handleCheckImage,
        deleteImage,
        selectedImageToCrop,
        switchToCrop,
				cropImageHandle,
    } = props;

		// console.log("selectedImageToCrop",selectedImageToCrop)



    return (
        <div>
            <Modal
                modalOpen={modalOpen}
                handleModal={handleModal}
                // title="Upload image(s)"
                // subTitle="You may upload up to 5 images"
                title= {selectedImageToCrop ? "Crop Image" : "Upload image(s)"}
                subTitle= {selectedImageToCrop ? "" : "Upload image(s)"}
               
            >
                {switchToCrop ? (
                    <ImageCropper
												selectedImageToCrop={selectedImageToCrop}
                        handleModal={handleModal}
                    />
                ) : (
                    <>
                        <FileInput
                            onChangeFileInput={onChangeFileInput}
                            selectedImagesLength={selectedImages?.length}
                        />
                        <div className="mt-4">
                            {selectedImages.map((image, index) => (
                                <FileItem
                                    key={index}
                                    image={image}
                                    index={index}
                                    deleteImage={deleteImage}
                                    handleCheckImage={handleCheckImage}
																		cropImageHandle={cropImageHandle}
                                />
                            ))}
                        </div>
                        {selectedImages?.length > 0 && (
                            <div className="flex">
                                <SecondaryButton
                                    onClick={() => handleModal(false)}
                                />
                                <PrimaryButton
                                    onClick={() =>
                                        handleModal(true, "selected")
                                    }
                                    disabled={!selectedImageToCrop}
                                />
                            </div>
                        )}
                    </>
                )}
            </Modal>
        </div>
    );
}

export default memo(FileInputModal);
