import React from "react";
import { useNavigate } from "react-router-dom";

import { useAction, useAppDispatch, useAppSelector } from "../../hooks/redux";

import { setActiveEntry } from "../../redux/reducers/EntrySlice";

import { systemConstants } from "../../redux/constants/systemConstants";

import DiaryEntryContent from "./DiaryEntryContent";
import DiaryEntryNotes from "./DiaryEntryNotes";
import DiaryEntryImages from "./DiaryEntryImages";
import DiaryEntryTitle from "./DiaryEntryTitle";
import DiaryEntryButtons from "./DiaryEntryButtons";

import CloseBlackPng1x from "../../assets/img/close-black1x.png";
import CloseBlackPng2x from "../../assets/img/close-black2x.png";

import "./DiaryEntry.scss";
import { systemSubmitModal } from "../../redux/reducers/SystemSlice";

const DiaryEntry: React.FC = () => {

    const dispatch = useAppDispatch();

    const { saveEntry } = useAction();

    const activeEntry = useAppSelector(state => state.entryReducer.activeEntry);

    const navigate = useNavigate();

    const handlerDeleteEntry = () => {
        activeEntry && dispatch(systemSubmitModal({
            type: systemConstants.DELETE_ENTRY,
            id: activeEntry.id,
            message: 'Are you sure you want to delete the entry?'
        }));
    }

    const handlerOnClickSave = () => {
        if (activeEntry) {
            const newId = saveEntry(activeEntry);
            Promise.resolve(newId).then(function(value) {
                navigate(`/diary/${value}`);
            });
        }
    }
    const handlerOnClickCancel = () => {
        activeEntry && dispatch(setActiveEntry(activeEntry.id));
    }

    return (
        <>
            {activeEntry ? (
                <>
                    <div className="entry__header">
                        <span className="entry__date">{activeEntry.date}</span>
                        <div className="img-container entry__delete">
                            <img src={CloseBlackPng1x} 
                                 srcSet={`${CloseBlackPng1x} 1x, ${CloseBlackPng2x} 2x`} 
                                 onClick={handlerDeleteEntry} 
                                 alt="delete" />
                        </div>
                    </div>
                    <div className="entry__title">
                        <DiaryEntryTitle />
                    </div>
                    <div className="entry__block">
                        <DiaryEntryContent />
                    </div>
                    <div className="entry__block">
                        <DiaryEntryImages images={activeEntry.images} />
                    </div>
                    <div className="entry__block entry__notes">
                        <span>#Notes</span>
                        <DiaryEntryNotes />
                    </div>
                    <DiaryEntryButtons handlerOnClickSave={handlerOnClickSave}
                                       handlerOnClickCancel={handlerOnClickCancel} />
                </>
            ) : (
                <span>Here is empty!</span>
            )}
        </>
    );
}

export default DiaryEntry;