import React from "react";
import defaultImage from "../../assets/defaultImage.png";
import webflow from "../../assets/webflow.png";
import SecondaryButton from "../../utilities/Buttons/SecondaryButton";

function Main(props) {
    const { handleModal, cropImage } = props;

    return (
        <div className="bg-white m-3 rounded-lg shadow-lg max-w-4xl w-full relative">
            <div className="background-image-div"></div>
            <div className="content-div p-8">
                <div className="content-div-flex">
                    <div>
                        <img
                            src={cropImage || defaultImage}
                            alt="Profile"
                            className="defaultImage"
                        />
                    </div>
                    <div className="ml-4">
                        <SecondaryButton
                            buttonText="Update Picture"
                            onClick={() => handleModal(true)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="name-div">Jack Smith</div>
                    <div className="details-div">
                        <span>@kingjack</span>
                        <span className="dot">.</span>
                        <span>Senior Product Designer at</span>
                        <span>
                            <img
                                src={webflow}
                                alt="Webflow Logo"
                                className="webflow-logo"
                            />
                        </span>
                        <span>Webflow</span>
                        <span className="dot">.</span>
                        <span>He/Him</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
