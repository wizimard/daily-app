import React, { useEffect } from "react";

import { DiaryEntries, DiaryEntry } from "../../components";

import { LayoutPage } from '../../ui';

import { useAppDispatch } from "../../hooks/redux";

import { clearActiveEntry } from "../../redux/reducers/EntrySlice";

const Diary: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(clearActiveEntry());

    }, [dispatch]);

    return (
        <LayoutPage>
            <div className="diary page-container">
                <DiaryEntries />
                <DiaryEntry />
            </div>
        </LayoutPage>
    )
}

export default Diary;