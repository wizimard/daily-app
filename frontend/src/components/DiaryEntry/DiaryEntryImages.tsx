import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { useAppSelector } from "../../hooks/redux";

import { ThemeContext } from "../../themes/Themes";

const DiaryEntryImages: React.FC = () => {

    const { theme } = useContext(ThemeContext);

    const images = useAppSelector(state => state.entryReducer.activeEntry?.images) ?? [];

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
                            <img src={theme.img.close.x1}
                                 srcSet={`${theme.img.close.x1} 1x, ${theme.img.close.x1} 2x`} 
                                 alt="delete" />
                        </div>
                    </div>
                </li>
            ))}
            <div className="entry__images--add">
                <label className="add-image">
                    <div className="img-container">
                        <img src={theme.img.add.x1}
                            srcSet={`${theme.img.add.x1} 1x, ${theme.img.add.x2} 2x`} 
                            alt="add" />
                    </div>
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