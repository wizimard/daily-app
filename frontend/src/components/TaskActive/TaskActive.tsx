import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { systemSubmitModal } from "../../redux/reducers/SystemSlice";
import { systemConstants } from "../../redux/constants/systemConstants";

import TaskDateStart from "./TaskDateStart";
import TaskDateEnd from "./TaskDateEnd";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskComments from "./TaskComments";
import TaskToDos from "./TaskToDos";
import TaskBtns from "./TaskBtns";

import CloseBlack1xPng from "../../assets/img/close-black1x.png";
import CloseBlack2xPng from "../../assets/img/close-black2x.png";
import DangerousPng from "../../assets/img/dangerous.png";
import CriticalPng from "../../assets/img/critical.png";

import "./TaskActive.scss";

const TaskActive:React.FC = () => {

    const dispatch = useAppDispatch();

    const {activeTaskStatus, activeTaskId} = useAppSelector(state => ({
        activeTaskStatus: state.task.activeTask?.status,
        activeTaskId: state.task.activeTask?.id
    }));

    const handlerDeleteTask = () => {
        if (activeTaskId) {
            dispatch(systemSubmitModal({
                type: systemConstants.DELETE_TASK,
                id: activeTaskId,
                message: "Are you sure you want to delete the task?"
            }))
        }
    }

    return(
        <>
        {activeTaskStatus ? (
            <>
                <div className="task__header">
                    <div className="task__header--left">
                        <TaskDateStart /> - <TaskDateEnd />
                        {activeTaskStatus.status && (
                            <div className="img-container">
                                {activeTaskStatus.status === 'dangerous' ? (
                                    <img src={DangerousPng} alt="dangerous" />
                                ) : (
                                    <img src={CriticalPng} alt="critical" />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="task__header--right">
                        <div className="img-container img-click">
                            <img src={CloseBlack1xPng} 
                                 srcSet={`${CloseBlack1xPng} 1x, ${CloseBlack2xPng} 2x`}
                                 alt="close"
                                 onClick={handlerDeleteTask} />
                        </div>
                    </div>
                </div>
                <div className="task__title">
                    <TaskTitle />
                </div>
                <div className="task__block">
                    <TaskDescription />
                </div>
                <div className="task__block">
                    <TaskToDos />
                </div>
                <div className="task__block">
                    <TaskComments />
                </div>
                <TaskBtns />
            </>
        ) : (
            <div>Here is empty</div>
        )}
        </>
    );
}

export default TaskActive;