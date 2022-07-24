import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ThemeContext } from "../../themes/Themes";

import { ContentScreen, EmptyScreen } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { fetchEntry } from "../../redux/action-creator/EntryActionCreator";
import { systemSubmitModal } from "../../redux/reducers/SystemSlice";
import { clearActiveEntry } from "../../redux/reducers/EntrySlice";
import { systemConstants } from "../../constants/systemConstants";

import { formatDate } from "../../helpers/date";

import DiaryEntryContent from "./DiaryEntryContent";
import DiaryEntryNotes from "./DiaryEntryNotes";
import DiaryEntryImages from "./DiaryEntryImages";
import DiaryEntryTitle from "./DiaryEntryTitle";
import DiaryEntryButtons from "./DiaryEntryButtons";

import "./DiaryEntry.scss";

const DiaryEntry: React.FC = () => {

    const navigate = useNavigate();

    const activeId = useParams().id

    const dispatch = useAppDispatch();

    const entryId = useAppSelector(state => state.entryReducer.activeEntry?.id);
    const entryDate = useAppSelector(state => state.entryReducer.activeEntry?.date);

    const { theme } = useContext(ThemeContext);

    const handlerBack = useCallback(() => {

        dispatch(clearActiveEntry());
        navigate('/diary');

    }, [dispatch, navigate]);

    const handlerDeleteEntry = useCallback(() => {
        if (!!entryId && entryId !== 'new') {
            dispatch(systemSubmitModal({
                type: systemConstants.DELETE_ENTRY,
                id: entryId,
                message: 'Are you sure you want to delete the entry?'
            }));
            return;
        }
        handlerBack();
    }, [dispatch, entryId, handlerBack]);

    useEffect(() => {
        
        if (activeId && activeId !== 'undefined') dispatch(fetchEntry(activeId));

    }, [dispatch, activeId]);

    return (
        <ContentScreen isDisplayNone={!entryId}>
        {!!entryId ? (
            <>
                <div className="entry__header">
                    <div className="entry__header--left">
                        <div className="img-container img-click entry__back">
                            <img src={theme.img.back} 
                                onClick={handlerBack}
                                alt="back" />
                        </div>
                        <span className="entry__date">{formatDate(entryDate)}</span>
                    </div>
                    <div className="img-container img-click entry__delete">
                        <img src={theme.img.close}
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
                    <DiaryEntryImages />
                </div>
                <div className="entry__block entry__notes">
                    <span>#Notes</span>
                    <DiaryEntryNotes />
                </div>
                <DiaryEntryButtons />
            </>
        ) : (
            <EmptyScreen />
        )}
        </ContentScreen>
    );
}

export default DiaryEntry;