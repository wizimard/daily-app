import React, { useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { ListItem, ListScreen } from "../../ui";

import { ITask } from "../../models/ITask";

import { formatDate } from "../../helpers/date";

import "./TaskList.scss";

interface TaskListProps {
    tasks: ITask[];
    activeItem: string;
}

const TaskList:React.FC<TaskListProps> = ({tasks, activeItem}) => {

    const { theme } = useContext(ThemeContext);

    return (
        <ListScreen>
            <ListItem link="/task/new" addClass="list-item_new">
                <div className="task-create-item">
                    <div className="task-create-item__content">
                        <div className="img-container task-create-item__img">
                            <img src={theme.img.add}
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
                                    {`${formatDate(task.date_start)} - ${formatDate(task.date_end)}`}
                                </span>
                                <h3 className="task-item__title">{task.title}</h3>
                            </div>
                            <div className="task-item__right">
                                <span className="task-item__done">{task.status}</span>
                            </div>
                        </ListItem>
                    </li>
                ))}
            </ul>
        </ListScreen>
    );
}

export default TaskList;