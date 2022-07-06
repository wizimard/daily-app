import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DiaryEntries, ContentScreen, DiaryEntry } from "../../components";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { fetchEntries } from "../../redux/action-creator/EntryActionCreator";
import { setActiveEntry } from "../../redux/reducers/EntrySlice";

import "./Diary.scss";

const Diary: React.FC = () => {

    const dispatch = useAppDispatch();
    const diary = useAppSelector(state => state.entryReducer);

    const entryId = useParams().id;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {

        (async() => {
            await dispatch(fetchEntries(0));
            await setIsLoaded(true);
        })();

    }, [dispatch]);

    useEffect(() => {

        if (entryId && isLoaded) dispatch(setActiveEntry(entryId));

    }, [dispatch, entryId, isLoaded]);

    return (
        <div className="diary page-container">
            <DiaryEntries entries={diary.entries} activeId={entryId} />
            <ContentScreen>
                <DiaryEntry />
            </ContentScreen>
        </div>
    )
}

export default Diary;