import React, { memo, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchEntries } from "../../redux/action-creator/EntryActionCreator";

import { ListItem, ListScreen } from "../../ui";

import { IEntry } from "../../models/IEntry";
import { formatDate } from "../../helpers/date";

import './DiaryEntries.scss';
import { clearEntries } from "../../redux/reducers/EntrySlice";

const DiaryEntries: React.FC = memo(() => {

    const { theme } = useContext(ThemeContext);

    const dispatch = useAppDispatch();

    const entries = useAppSelector(state => state.entryReducer.entries);
    const isAllFetching = useAppSelector(state => state.entryReducer.isAllFetching);

    const entryId = useParams().id;

    const handlerLoadNextEntries = (e: React.UIEvent<HTMLDivElement>) => {
        if (!isAllFetching && e.currentTarget.scrollTop + e.currentTarget.offsetHeight >= e.currentTarget.scrollHeight) {
            dispatch(fetchEntries(entries.length));
        }
    }

    useEffect(() => {
        dispatch(fetchEntries(0));

        return (() => {
            dispatch(clearEntries());
        });
    }, [dispatch]);

    return (
        <ListScreen onScrollHandle={handlerLoadNextEntries}>
            <ListItem link="/diary/new" addClass="list-item_new">
                <div className="diary-create-entry">
                    <span className="diary-create-entry__date">{formatDate()}</span>
                    <div className="diary-create-entry__content">
                        <div className="img-container diary-create-entry__img">
                            <img src={theme.img.add}
                                 alt="add" />
                        </div>
                        <h3 className="diary-create-entry__text">Create a new entry</h3>
                    </div>
                </div>
            </ListItem>
            <ul>
                {entries.map((entry: IEntry, index) => (
                    <li className="diary-entry" key={index}>
                        <ListItem link={`/diary/${entry.id}`} 
                                  addClass={entryId === entry.id ? "list-item_active" : ""}>
                            <div className="diary-entry__left">
                                <div className="img-container diary-entry__img">
                                    <img src={entry.images[0] || theme.img.diaryDefault} alt="1" />
                                </div>
                            </div>
                            <div className="diary-entry__right">
                                <span className="diary-entry__date">{formatDate(entry.date)}</span>
                                <h3 className="diary-entry__title">{entry.title}</h3>
                                <span className="diary-entry__notes">{entry.notes}</span>
                            </div>
                        </ListItem>
                    </li>
                ))}
            </ul>
            <div className="next-loader"></div>
        </ListScreen>
    );
});

export default DiaryEntries;