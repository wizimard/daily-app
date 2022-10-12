import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { changeEntryTitle } from "../../redux/reducers/EntrySlice";

import { TextareaElement } from "../../ui";

const DiaryEntryTitle:React.FC = () => {

    const dispatch = useAppDispatch();

    const title = useAppSelector(state => state.entryReducer.activeEntry?.title);

    const handlerOnSaveTitle = (changeContent: string) => {
        if (title !== changeContent) dispatch(changeEntryTitle(changeContent));
    }
    return (
        <TextareaElement value={title || ""} 
                         handlerOnSave={handlerOnSaveTitle}
                         placeholder="Title..." />
    )
}

export default DiaryEntryTitle;