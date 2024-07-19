import React, { useState, useEffect } from "react";
import "./generic.css";
import Main from "./subcomponents/Main";
import FileInputModal from "./subcomponents/FileInputModal";


function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorObj, setErrorObj] = useState({
        message: "",
        show: false,
    });

    const [selectedImageToCrop, setSelectedImageToCrop] = useState(null);
    const [switchToCrop, setSwitchToCrop] = useState(false);
    const [cropImage, setCropImage] = useState(null);

    useEffect(() => {
        if (selectedImages.length > 0) {
            const imageToUpload = selectedImages.find(
                (image) => image.progress === 0
            );
            if (imageToUpload) {
                simulateUpload(imageToUpload);
            }
        }
    }, [selectedImages]);

    const handleModal = (val, flag = "",updatedAvatarUrl="") => {
        if (!val) {
            setModalOpen(val);
            setSelectedImages([]);
            setSelectedImageToCrop(null);
        } else {
            setModalOpen(val);
            if (flag === "selected") {
                setSwitchToCrop(true);
            }else if (flag === "selectedImageToSet") {
              setCropImage(updatedAvatarUrl);
              setModalOpen(false);
              setSelectedImages([]);
              setSelectedImageToCrop(null);
              setSwitchToCrop(false);
            }
        }
    };

    const onChangeFileInput = (files) => {
        const tempImages = [...selectedImages];

        if (files.length + tempImages.length > 5) {
            setErrorObj({
                message: "Maximum 5 images allowed.",
                show: true,
            });
            return;
        }

        const newImages = Array.from(files).map((file) => ({
            file,
            progress: 0,
            checked: false,
            format: file.type.split("/")[1],
            showSuccess: false,
        }));
        setSelectedImages([...selectedImages, ...newImages]);
    };

    const simulateUpload = (image) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(interval);
                updateSuccess(image, true);
                setTimeout(() => {
                    updateSuccess(image, false);
                }, 500);
            }
            updateProgress(image, progress);
        }, 500);
    };

    const updateProgress = (image, progress) => {
        setSelectedImages((prevImages) => {
            return prevImages.map((img) => {
                if (img.file === image.file) {
                    return { ...img, progress };
                }
                return img;
            });
        });
    };

    const updateSuccess = (image, value) => {
        setSelectedImages((prevImages) => {
            return prevImages.map((img) => {
                if (img.file === image.file) {
                    return { ...img, showSuccess: value };
                }
                return img;
            });
        });
    };
    const handleCheckImage = (img, index) => {
        setSelectedImages((prevImages) =>
            prevImages.map((image, i) =>
                i === index
                    ? { ...image, checked: !image.checked }
                    : { ...image, checked: false }
            )
        );
        setSelectedImageToCrop(img.file);
    };

    const deleteImage = (index) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen w-screen flex flex-col items-center justify-center overflow-y-auto">
            <Main handleModal={handleModal} cropImage={cropImage}/>
            <FileInputModal
                onChangeFileInput={onChangeFileInput}
                selectedImages={selectedImages}
                modalOpen={modalOpen}
                handleModal={handleModal}
                handleCheckImage={handleCheckImage}
                deleteImage={deleteImage}
                selectedImageToCrop={selectedImageToCrop}
                switchToCrop={switchToCrop}
            />
        </div>
    );
}

export default Home;
