import React from "react";

import ListItem from "../ListItem";
import ListScreen from "../ListScreen";

import { IEntry } from "../../models/IEntry";
import { formatDate } from "../../utils/date";

import addBlackImg1x from '../../assets/img/add-black1x.png';
import addBlackImg2x from '../../assets/img/add-black2x.png';

import './DiaryEntries.scss';

interface DiaryEntriesProps {
    entries: IEntry[];
    activeId: string | undefined;
}

const DiaryEntries: React.FC<DiaryEntriesProps> = ({ entries, activeId }) => {

    return (
        <ListScreen>
            <ListItem link="/diary/new" addClass="list-item_new">
                <div className="diary-create-entry">
                    <span className="diary-create-entry__date">{formatDate()}</span>
                    <div className="diary-create-entry__content">
                        <div className="img-container diary-create-entry__img">
                            <img src={addBlackImg1x} 
                                 srcSet={`${addBlackImg1x} 1x, ${addBlackImg2x} 2x`}
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
                                    <img src={entry.images[0] || 'https://play-lh.googleusercontent.com/kEvCkfWu-Ijx7beQ4RCNPjZGKcY9vf2XSfHlBvpOjs9CFPTWPFubia_YbYMaW2cJyQDR'} alt="1" />
                                </div>
                            </div>
                            <div className="diary-entry__right">
                                <span className="diary-entry__date">{entry.date}</span>
                                <h3 className="diary-entry__title">{entry.title}</h3>
                                <span className="diary-entry__notes">{entry.notes}</span>
                            </div>
                        </ListItem>
                    </li>
                ))}
            </ul>
        </ListScreen>
    );
}

export default DiaryEntries;