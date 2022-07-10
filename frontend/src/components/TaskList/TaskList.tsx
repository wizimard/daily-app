import React from "react";

import ListItem from "../ListItem";
import ListScreen from "../ListScreen";

import { ITask } from "../../models/ITask";

import addBlackImg1x from "../../assets/img/add-black1x.png";
import addBlackImg2x from "../../assets/img/add-black2x.png";
import DangerousPng from "../../assets/img/dangerous.png";
import CriticalPng from "../../assets/img/critical.png";

import "./TaskList.scss";

interface TaskListProps {
    tasks: ITask[];
    activeItem: string;
}

const TaskList:React.FC<TaskListProps> = ({tasks, activeItem}) => {

    return (
        <ListScreen>
            <ListItem link="/task/new" addClass="list-item_new">
                <div className="task-create-item">
                    <div className="task-create-item__content">
                        <div className="img-container task-create-item__img">
                            <img src={addBlackImg1x} 
                                 srcSet={`${addBlackImg1x} 1x, ${addBlackImg2x} 2x`}
                                 alt="add" />
                        </div>
                        <h3 className="task-create-item__text">Create a new task</h3>
                    </div>
                </div>
            </ListItem>
            <ul>
                {tasks.map((task, index) => (
                    <li className="task-item" key={index}>
                        <ListItem link={`/task/${task.id}`}
                                  addClass={activeItem === task.id ? "bg-none list-item_active" : "bg-none"}>
                            <div className="task-item__left">
                                <span className="task-item__date">
                                    {`${task.date_start} - ${task.date_end}`}
                                </span>
                                <h3 className="task-item__title">{task.title}</h3>
                            </div>
                            <div className="task-item__right">
                                <div className="img-container task-item__status">
                                    {task.status.status && (
                                        <>
                                        {task.status.status === 'dangerous' ? (
                                            <img src={DangerousPng} alt="dangerous" />
                                        ) : (
                                            <img src={CriticalPng} alt="critical" />
                                        )}
                                        </>
                                    )}
                                    
                                </div>
                                <span className="task-item__done">{task.status.done}</span>
                            </div>
                        </ListItem>
                    </li>
                ))}
            </ul>
        </ListScreen>
    );
}

export default TaskList;