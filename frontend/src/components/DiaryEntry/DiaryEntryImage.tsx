import React, { useCallback, useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch } from "../../hooks/redux";

import { deleteEntryImage } from "../../redux/reducers/EntrySlice";

interface DiaryEntryImageProps { 
    image: string;
    onClick: (img: string) => void;
}

const DiaryEntryImage:React.FC<DiaryEntryImageProps> = ({ image, onClick }) => {

    const { theme } = useContext(ThemeContext);

    const dispatch = useAppDispatch();

    const deleteImageHandle = useCallback(() => {
        dispatch(deleteEntryImage(image));
    }, [dispatch, image]);

    const handlerOnClick = () => {
        onClick(image);
    }
    
    return (
        <div className="img-container entry__image">
            <img src={image} alt={image} onClick={handlerOnClick} />
            <div className="img-container entry__image--delete" 
                 onClick={deleteImageHandle}>
                <img src={theme.img.close.x1}
                        srcSet={`${theme.img.close.x1} 1x, ${theme.img.close.x1} 2x`}
                        alt="delete" />
            </div>
        </div>
    );
};

export default DiaryEntryImage;