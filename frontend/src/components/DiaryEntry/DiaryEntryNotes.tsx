import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeEntryNotes } from "../../redux/reducers/EntrySlice";

import { TextareaElement } from "../../ui";

const DiaryEntryNotes: React.FC = () => {

    const dispatch = useAppDispatch();

    const notes = useAppSelector(state => state.entryReducer.activeEntry?.notes);

    const handlerSaveNotes = (changeContent: string) => {
        if (notes !== changeContent) dispatch(changeEntryNotes(changeContent));
    }

    return (
        <TextareaElement value={notes || ""}
                         handlerOnSave={handlerSaveNotes}
                         placeholder="Notes..." />
    );
}

export default DiaryEntryNotes;