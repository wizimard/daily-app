import React from "react";
import { useNavigate } from "react-router-dom";

import { useAction, useAppDispatch, useAppSelector } from "../../hooks/redux";

import { setActiveEntry } from "../../redux/reducers/EntrySlice";

import DiaryEntryContent from "./DiaryEntryContent";
import DiaryEntryNotes from "./DiaryEntryNotes";
import DiaryEntryImages from "./DiaryEntryImages";
import DiaryEntryTitle from "./DiaryEntryTitle";
import DiaryEntryButtons from "./DiaryEntryButtons";

import DeleteImg from "../../assets/img/delete-black.png";

import "./DiaryEntry.scss";

const DiaryEntry: React.FC = () => {

    const dispatch = useAppDispatch();

    const { saveEntry, deleteEntry } = useAction();

    const activeEntry = useAppSelector(state => state.entryReducer.activeEntry);

    const navigate = useNavigate();

    const handlerDeleteEntry = () => {
        activeEntry && deleteEntry(activeEntry.id);

        navigate('/diary');
    }

    const handlerOnClickSave = () => {
        activeEntry && saveEntry(activeEntry);
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
                            <img src={DeleteImg} onClick={handlerDeleteEntry} alt="delete" />
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