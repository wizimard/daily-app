import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { changeEntryContent } from "../../redux/reducers/EntrySlice";

import { TextareaElement } from '../../ui';

const DiaryEntryContent: React.FC = () => {

    const dispatch = useAppDispatch();

    const content = useAppSelector(state => state.entryReducer.activeEntry?.content);

    const handlerSaveContent = (changeContent: string) => {
        if (content !== changeContent) dispatch(changeEntryContent(changeContent));
    }
    
    return (
            <TextareaElement value={content || ""} 
                             handlerOnSave={handlerSaveContent}
                             placeholder="Content..." />
    );
}

export default DiaryEntryContent;