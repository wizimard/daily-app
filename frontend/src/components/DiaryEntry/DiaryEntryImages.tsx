import React, { ChangeEvent, useEffect, useState } from "react";

import AddImg1x from "../../assets/img/add-black1x.png";
import AddImg2x from "../../assets/img/add-black2x.png";
import DeleteImg1x from "../../assets/img/close-black1x.png";
import DeleteImg2x from "../../assets/img/close-black2x.png";

interface DiaryEntryImagesProps {
    images: string[];
}

const DiaryEntryImages: React.FC<DiaryEntryImagesProps> = ({images}) => {

    const [currentImages, setCurrentImages] = useState<string[]>(images);

    const addImageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const url = reader.readAsDataURL(files[i]);

            reader.onloadend = function(e) {

                setCurrentImages(prev => {
                    if (typeof reader.result === "string") return [...prev, reader.result]
                    return [...prev];
                });

            }
        }
    }

    useEffect(() => {

        setCurrentImages(images);

    }, [images]);

    return (
        <ul className="entry__images">
            {currentImages.map((image, index) => (
                <li key={index}>
                    <div className="img-container entry__image">
                        <img src={image} alt={index.toString()} />
                        <div className="img-container entry__image--delete">
                            <img src={DeleteImg1x}
                                 srcSet={`${DeleteImg1x} 1x, ${DeleteImg2x} 2x`} 
                                 alt="delete" />
                        </div>
                    </div>
                </li>
            ))}
            <div className="entry__images--add">
                <label className="add-image img-container">
                    <img src={AddImg1x}
                         srcSet={`${AddImg1x} 1x, ${AddImg2x} 2x`} 
                         alt="add" />
                    <input className="add-image__input" 
                           type="file"
                           multiple
                           onChange={addImageHandle} />
                </label>
            </div>
        </ul>
    );
}

export default DiaryEntryImages;