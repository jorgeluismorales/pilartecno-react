import React from 'react'


import Lottie from "react-lottie";

import notFound from "../../assets/notfound.json"

const Animation = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFound,
    };

    return (
        <div style={{ height: "400px" }}>
            <Lottie options={defaultOptions} />
        </div>
    )
}

export default Animation
