import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { DiaryEntries, DiaryEntry } from "../../components";

import { LayoutPage } from '../../ui';

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { fetchEntries, fetchEntry } from "../../redux/action-creator/EntryActionCreator";
import { clearActiveEntry } from "../../redux/reducers/EntrySlice";

const Diary: React.FC = () => {

    const dispatch = useAppDispatch();
    const entries = useAppSelector(state => state.entryReducer.entries);

    const entryId = useParams().id;

    useEffect(() => {

        dispatch(fetchEntries());

    }, [dispatch]);

    useEffect(() => {

        dispatch(clearActiveEntry());
        
        if (entryId && entryId !== 'undefined') dispatch(fetchEntry(entryId));

    }, [dispatch, entryId]);

    return (
        <LayoutPage>
            <div className="diary page-container">
                <DiaryEntries entries={entries} activeId={entryId} />
                <DiaryEntry />
            </div>
        </LayoutPage>
    )
}

export default Diary;