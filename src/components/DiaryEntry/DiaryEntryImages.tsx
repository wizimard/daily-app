import React, { ChangeEvent, useEffect, useState } from "react";

import AddImg from "../../assets/img/add-black.png";
import DeleteImg from "../../assets/img/delete-black.png";

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
                            <img src={DeleteImg} alt="delete" />
                        </div>
                    </div>
                </li>
            ))}
            <div className="entry__images--add">
                <label className="add-image img-container">
                    <img src={AddImg} alt="add" />
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