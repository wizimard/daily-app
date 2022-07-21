import React, { ChangeEvent, useContext } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { uploadImages } from "../../redux/action-creator/EntryActionCreator";

import { ThemeContext } from "../../themes/Themes";
import DiaryEntryImage from "./DiaryEntryImage";

const DiaryEntryImages: React.FC = () => {

    const { theme } = useContext(ThemeContext);

    const dispatch = useAppDispatch();

    const images = useAppSelector(state => state.entryReducer.activeEntry?.images) ?? [];

    const addImageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(uploadImages(e.target.files));
    }

    return (
        <ul className="entry__images">
            {images.map((image, index) => (
                <li key={index}>
                    <DiaryEntryImage image={image} />
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
                           accept="image/*"
                           multiple
                           onChange={addImageHandle} />
                </label>
            </div>
        </ul>
    );
}

export default DiaryEntryImages;