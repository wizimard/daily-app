import React, { useState } from 'react';
import { ModalComponent } from '..';

import './ImageViewer.scss';

interface ImageViewerProps {
    images: string[];
    selectedImage: string;
    handlerOnClose: () => void;
}

const ImageViewer:React.FC<ImageViewerProps> = ({ images, selectedImage, handlerOnClose }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(() => {
        for (let i = 0; i < images.length; i++) {
            if (images[i] === selectedImage) return i;
        }
        return 0;
    });

    const handlerPrevImage = () => {
        setCurrentImageIndex((prev) => {
            let value = prev - 1;
            if (value < 0) value = images.length - 1;
            return value;
        });
    }
    const handlerNextImage = () => {
        setCurrentImageIndex((prev) => {
            let value = prev + 1;
            if (value >= images.length) value = 0;
            return value;
        });
    }

    return (
        <ModalComponent closeModalHandle={handlerOnClose}>
            <div className="image-viewer">
                <div className="image-prev" onClick={handlerPrevImage}>
                    <div className="triangle"></div>
                </div>
                <div className="image">
                    <div className="img-container">
                        <img src={images[currentImageIndex]} />
                    </div>
                </div>
                <div className="image-next" onClick={handlerNextImage}>
                    <div className="triangle"></div>
                </div>
            </div>
        </ModalComponent>
    );
}

export default ImageViewer;