import React, { ChangeEvent, useCallback, useContext, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { uploadImages } from "../../redux/action-creator/EntryActionCreator";

import { ThemeContext } from "../../themes/Themes";
import { ImageViewer } from "../../ui";
import DiaryEntryImage from "./DiaryEntryImage";

const DiaryEntryImages: React.FC = () => {

    const { theme } = useContext(ThemeContext);

    const dispatch = useAppDispatch();

    const images = useAppSelector(state => state.entryReducer.activeEntry?.images) ?? [];

    const [isShowViewer, setIsShowViewer] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string>('');

    const addImageHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(uploadImages(e.target.files));
    }, [dispatch]);
    const handlerShowViewer = (img: string) => {
        setSelectedImg(img);
        setIsShowViewer(true);
    }
    const handlerHideViewer = () => {
        setIsShowViewer(false);
    }

    return (
        <ul className="entry__images">
            {images.map((image, index) => (
                <li key={index}>
                    <DiaryEntryImage onClick={handlerShowViewer} image={image} />
                </li>
            ))}
            <div className="entry__images--add">
                <label className="add-image">
                    <div className="img-container">
                        <img src={theme.img.add}
                            alt="add" />
                    </div>
                    <input className="add-image__input" 
                           type="file"
                           accept="image/*"
                           multiple
                           onChange={addImageHandle} />
                </label>
            </div>
            {isShowViewer && (
                <ImageViewer images={images} 
                    selectedImage={selectedImg} 
                    handlerOnClose={handlerHideViewer} />
            )}
        </ul>
    );
}

export default DiaryEntryImages;