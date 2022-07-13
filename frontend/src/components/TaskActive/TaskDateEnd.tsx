import React, { useState } from "react";

import { Calendar } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeTaskDateEnd } from "../../redux/reducers/TaskSlice";

const TaskDateEnd:React.FC = () => {

    const dispatch = useAppDispatch();

    const dateEnd = useAppSelector(state => state.task.activeTask?.date_end);

    const [isShow, setIsShow] = useState(false);

    const handlerShowCalendar = () => {
        setIsShow(true);
    }

    const handlerSelectDate = (date: Date) => {
        dispatch(changeTaskDateEnd(date.toString()));
        setIsShow(false);
    }

    return (
        <span className="task__date task__date--end" onClick={handlerShowCalendar}>
            {dateEnd}
            {isShow && <Calendar selectedDate={new Date()} handlerSelectDate={handlerSelectDate} />}
        </span>
    )
};

export default TaskDateEnd;