import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { saveEntry } from "../../redux/action-creator/EntryActionCreator";
import { setActiveEntry } from "../../redux/reducers/EntrySlice";

const DiaryEntryButtons:React.FC = () => {

    const dispatch = useAppDispatch();

    const activeEntry = useAppSelector(state => state.entryReducer.activeEntry);

    const navigate = useNavigate();

    const isChangedEntry = useAppSelector(state => state.entryReducer.isChangedEntry);

    const handlerOnClickSave = () => {
        if (activeEntry) {
            const newId = dispatch(saveEntry(activeEntry));
            Promise.resolve(newId).then(function(value) {
                value && navigate(`/diary/${value}`);
            });
        }
    }
    const handlerOnClickCancel = () => {
        activeEntry && dispatch(setActiveEntry(activeEntry.id));
    }

    return (<>{isChangedEntry && (
        <div className="entry__btn-group">
            <Button text="save" onClick={handlerOnClickSave} addedClass="entry__save" />
            {activeEntry?.id !== 'new' && (
                <Button text="cancel" onClick={handlerOnClickCancel} addedClass="entry__cancel" />
            )}
        </div>
    )}</>);
};

export default DiaryEntryButtons;