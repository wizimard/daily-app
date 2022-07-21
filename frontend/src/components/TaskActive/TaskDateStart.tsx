import React, { useState } from "react";

import { Calendar } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeTaskDateStart } from "../../redux/reducers/TaskSlice";

import { formatDate } from "../../helpers/date";

const TaskDateStart:React.FC = () => {

    const dispatch = useAppDispatch();

    const dateStart = useAppSelector(state => state.task.activeTask?.date_start);

    const [isShow, setIsShow] = useState(false);

    const handlerShowCalendar = () => {
        setIsShow(true);
    }

    const handlerSelectDate = (date: Date) => {
        dispatch(changeTaskDateStart(date.toString()));
        setIsShow(false);
    }

    return (
        <span className="task__date task__date--start" onClick={handlerShowCalendar}>
            {formatDate(dateStart)}
            {isShow && <Calendar selectedDate={new Date()} handlerSelectDate={handlerSelectDate} />}
        </span>
    )
};

export default TaskDateStart;