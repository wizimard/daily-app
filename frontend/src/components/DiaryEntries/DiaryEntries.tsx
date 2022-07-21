import React, { memo, useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { ListItem, ListScreen } from "../../ui";

import { IEntry } from "../../models/IEntry";
import { formatDate } from "../../helpers/date";

import './DiaryEntries.scss';

interface DiaryEntriesProps {
    entries: IEntry[];
    activeId: string | undefined;
}

const DiaryEntries: React.FC<DiaryEntriesProps> = memo(({ entries, activeId }) => {

    const { theme } = useContext(ThemeContext);

    return (
        <ListScreen>
            <ListItem link="/diary/new" addClass="list-item_new">
                <div className="diary-create-entry">
                    <span className="diary-create-entry__date">{formatDate()}</span>
                    <div className="diary-create-entry__content">
                        <div className="img-container diary-create-entry__img">
                            <img src={theme.img.add.x1} 
                                 srcSet={`${theme.img.add.x1} 1x, ${theme.img.add.x2} 2x`}
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
                                  addClass={activeId === entry.id ? "list-item_active" : ""}>
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
        </ListScreen>
    );
});

export default DiaryEntries;