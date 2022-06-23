import React from "react";
import { useAppSelector } from "../../hooks/redux";
import Button from "../Button";

interface DiaryEntryButtonsProps {
    handlerOnClickSave: () => void;
    handlerOnClickCancel: () => void;
}

const DiaryEntryButtons:React.FC<DiaryEntryButtonsProps> = ({
    handlerOnClickSave ,handlerOnClickCancel }) => {

    const isChangedEntry = useAppSelector(state => state.entryReducer.isChangedEntry);

    return (<>{isChangedEntry && (
        <div className="entry__btn-group">
            <Button text="save" onClick={handlerOnClickSave} addedClass="entry__save" />
            <Button text="cancel" onClick={handlerOnClickCancel} addedClass="entry__cancel" />
        </div>
    )}</>);
};

export default DiaryEntryButtons;