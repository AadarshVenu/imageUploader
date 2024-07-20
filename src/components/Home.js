import React, { useState, useEffect, useRef } from "react";
import "./generic.css";
import Main from "./subcomponents/Main";
import FileInputModal from "./subcomponents/FileInputModal";
import AlertComponent from "./subcomponents/AlertComponent";
import { v4 as uuidv4 } from "uuid";
import {
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    getMetadata,
    deleteObject,
} from "../firebase-config";
import defaultImage from "../assets/defaultImage.png";

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageToCrop, setSelectedImageToCrop] = useState(null);
    const [switchToCrop, setSwitchToCrop] = useState(false);
    const [cropImage, setCropImage] = useState(defaultImage);
    const [userId, setUserId] = useState("");
    const [alert, setAlert] = useState({
        message: "",
        show: false,
        success: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const progressRef = useRef({});

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const newUserId = uuidv4();
            setUserId(newUserId);
            localStorage.setItem("userId", newUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUploadedProfileImage();
        }
    }, [userId]);

    const fetchUploadedProfileImage = async () => {
        if (!userId) return;

        const imagesRef = ref(storage, `users/${userId}/profileImage/`);
        try {
            const res = await listAll(imagesRef);
            const urls = await Promise.all(
                res.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    const metadata = await getMetadata(itemRef);
                    return {
                        name: itemRef.name,
                        url,
                        size: metadata.size,
                        imgUrl: metadata.customMetadata.updatedAvatarUrl,
                    };
                })
            );

            setCropImage(urls[0].imgUrl ? urls[0].imgUrl : defaultImage);
        } catch (error) {
            console.error("Failed to fetch images:", error);
        }
    };

    const handleModal = async (
        val,
        flag = "",
        updatedAvatarUrl = "",
        selectedImage = {}
    ) => {
        if (!val) {
            setModalOpen(val);
            setSelectedImageToCrop(null);
            setSwitchToCrop(false);
        } else {
            setModalOpen(val);
            setAlert({
                ...alert,
                show: false,
            });
            if (flag === "selected") {
                setSwitchToCrop(true);
            } else if (flag === "selectedImageToSet") {
                setModalOpen(false);
                setSelectedImageToCrop(null);
                setSwitchToCrop(false);
                setIsLoading(true);
                setCropImage(updatedAvatarUrl);
                const res = await handleUpdateAvatar(
                    selectedImage,
                    updatedAvatarUrl
                );
                if (res.success) {
                    setIsLoading(false);
                    setAlert({
                        message: res.message,
                        show: true,
                        success: true,
                    });
                } else {
                    setIsLoading(false);
                    setAlert({
                        message: res.message,
                        show: true,
                        success: false,
                    });
                }
            }
        }
        const selectedImagesCopy = [...selectedImages];
        selectedImagesCopy.forEach((image) => {
            image.checked = false;
        });
        setSelectedImages(selectedImagesCopy);
    };

    const deleteAllFilesInFolder = async (folderPath) => {
        const listRef = ref(storage, folderPath);
        try {
            const res = await listAll(listRef);
            const deletePromises = res.items.map((itemRef) =>
                deleteObject(itemRef)
            );
            await Promise.all(deletePromises);
        } catch (error) {
            console.error("Error deleting files:", error);
        }
    };

    const handleUpdateAvatar = async (img, updatedAvatarUrl) => {
        if (img) {
            const folderPath = `users/${userId}/profileImage/`;

            await deleteAllFilesInFolder(folderPath);

            const storageRef = ref(storage, `${folderPath}${img.file.name}`);
            try {
                const metadata = {
                    contentType: img.file.type,
                    customMetadata: {
                        format: img.format,
                        updatedAvatarUrl: updatedAvatarUrl,
                    },
                };
                const snapshot = await uploadBytesResumable(
                    storageRef,
                    img.file,
                    metadata
                );
                const downloadURL = await getDownloadURL(snapshot.ref);

                return {
                    success: true,
                    message: "Changes saved successfully",
                };

                // setAlert({
                //     message: "Changes saved successfully!",
                //     show: true,
                //     success: true,
                // });
            } catch (error) {
                console.error("Error uploading file:", error);
                // setAlert({
                //     message:
                //         "Upload failed. Please retry or contact us if you believe this is a bug.",
                //     show: true,
                //     success: false,
                // });
                return {
                    success: true,
                    message:
                        "Upload failed. Please retry or contact us if you believe this is a bug.",
                };
            }
        }
    };

    const onChangeFileInput = async (files) => {
        const tempImages = [...selectedImages];

        if (files.length + tempImages.length > 5) {
            setAlert({
                message: "You can only upload a maximum of 5 images.",
                show: true,
                success: false,
            });
            return;
        }

        const newImages = Array.from(files).map((file) => ({
            file,
            progress: 0,
            checked: false,
            format: file.type.split("/")[1],
            showSuccess: false,
            uploading: false
        }));

				// console.log("Files to be uploaded: ", newImages);

        const supportedImages = [...newImages].filter(
            (img) =>
                (img.format === "jpeg" || img.format === "png") &&
                (img.file.size / 1024 / 1024).toFixed(2) <= 5
        );
        const nonSupportedImages = [...newImages].filter(
            (img) =>
                (img.format !== "jpeg" && img.format !== "png") ||
                (img.file.size / 1024 / 1024).toFixed(2) > 5
        );

        setSelectedImages([...tempImages, ...newImages]);
        const uploadedImages = await uploadImages(supportedImages);
        setSelectedImages([
            ...tempImages,
            ...nonSupportedImages,
            ...uploadedImages,
        ]);
    };

    const uploadImages = async (images) => {
        if (!userId) return [];

        const uploadPromises = images.map((image) => {
            const imageRef = ref(
                storage,
                `users/${userId}/uploadedImages/${image.file.name}`
            );
            const metadata = {
                contentType: image.file.type,
                customMetadata: {
                    format: image.format,
                },
            };

            const uploadTask = uploadBytesResumable(
                imageRef,
                image.file,
                metadata
            );
            progressRef.current[image.file.name] = 0;

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const totalProgress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        progressRef.current[image.file.name] = Math.min(
                            totalProgress,
                            100
                        );
                        setSelectedImages((prevImages) =>
                            prevImages.map((img) =>
                                img.file === image.file
                                    ? {
                                          ...img,
                                          progress:
                                              progressRef.current[
                                                  image.file.name
                                              ],
                                      }
                                    : img
                            )
                        );
                    },
                    (error) => {
                        console.error("Upload failed:", error);
                        updateUploading(image.file, false);
                        reject(error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(
                                uploadTask.snapshot.ref
                            );
                            await gradualSuccessUpdate(image, downloadURL);
                            resolve({
                                ...image,
                                url: downloadURL,
                                progress: 100,
                                name: image.file.name,
                                size: image.file.size,
                            });
                        } catch (error) {
                            console.error("Error getting download URL:", error);
                            reject(error);
                        }
                    }
                );
            });
        });

        try {
            const uploadedImages = await Promise.all(uploadPromises);
            return uploadedImages;
        } catch (error) {
            console.error("Error uploading images:", error);
            return [];
        }
    };

    const gradualSuccessUpdate = (image, downloadURL) => {
        setSelectedImages((prevImages) =>
            prevImages.map((img) =>
                img.file === image.file
                    ? {
                          ...img,
                          showSuccess: true,
                          progress: 100,
                          url: downloadURL,
                      }
                    : img
            )
        );

        setTimeout(() => {
            setSelectedImages((prevImages) =>
                prevImages.map((img) =>
                    img.file === image.file
                        ? { ...img, showSuccess: false }
                        : img
                )
            );
        }, 350);
    };

    const updateUploading = (file, value) => {
        setSelectedImages((prevImages) =>
            prevImages.map((img) =>
                img.file === file ? { ...img, uploading: value } : img
            )
        );
    };

    const handleCheckImage = (img, index) => {
        setSelectedImages((prevImages) =>
            prevImages.map((image, i) =>
                i === index
                    ? { ...image, checked: !image.checked }
                    : { ...image, checked: false }
            )
        );
        setSelectedImageToCrop(img);
    };

    const deleteImage = async (index) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    };

    const cropImageHandle = (index) => {
        const selectedImage = selectedImages[index];
        setSelectedImageToCrop(selectedImage);
        setSwitchToCrop(true);
    };

    const handleAlert = () => {
        setAlert({
            ...alert,
            show: false,
        });
    };

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen w-screen overflow-y-auto">
            <div className="h-[7.5rem] flex flex-col items-center">
                <AlertComponent alert={alert} handleAlert={handleAlert} />
            </div>
            <div className="flex flex-col items-center justify-center h-[30rem]">
                <Main
                    handleModal={handleModal}
                    cropImage={cropImage}
                    isLoading={isLoading}
                />
                <FileInputModal
                    onChangeFileInput={onChangeFileInput}
                    selectedImages={selectedImages}
                    modalOpen={modalOpen}
                    handleModal={handleModal}
                    handleCheckImage={handleCheckImage}
                    deleteImage={deleteImage}
                    selectedImageToCrop={selectedImageToCrop}
                    switchToCrop={switchToCrop}
                    cropImageHandle={cropImageHandle}
                />
            </div>
        </div>
    );
}

export default Home;
