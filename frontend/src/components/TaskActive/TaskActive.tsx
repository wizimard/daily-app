import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../themes/Themes";

import { ContentScreen, EmptyScreen } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { systemSubmitModal } from "../../redux/reducers/SystemSlice";
import { clearActiveTask } from "../../redux/reducers/TaskSlice";

import { systemConstants } from "../../constants/systemConstants";

import TaskDateStart from "./TaskDateStart";
import TaskDateEnd from "./TaskDateEnd";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskToDos from "./TaskToDos";
import TaskBtns from "./TaskBtns";

import "./TaskActive.scss";

const TaskActive:React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    
    const activeTaskId = useAppSelector(state => state.task.activeTask?.id); 
    const activeTaskStatus = useAppSelector(state => state.task.activeTask?.status);

    const { theme } = useContext(ThemeContext);

    const handlerBack = useCallback(() => {

        dispatch(clearActiveTask());
        navigate('/task');

    }, [dispatch, navigate]);
    
    const handlerDeleteTask = useCallback(() => {
        if (!!activeTaskId && activeTaskId !== 'new') {
            dispatch(systemSubmitModal({
                type: systemConstants.DELETE_TASK,
                id: activeTaskId,
                message: "Are you sure you want to delete the task?"
            }));
            return;
        }
        handlerBack();
    }, [dispatch, activeTaskId, handlerBack]);

    return(
        <ContentScreen isDisplayNone={!activeTaskStatus}>
        {activeTaskStatus ? (
            <>
                <div className="task__header">
                    <div className="task__header--left">
                        <div className="img-container img-click task__back">
                            <img src={theme.img.back} 
                                onClick={handlerBack}
                                alt="back" />
                        </div>
                        <TaskDateStart /> - <TaskDateEnd />
                        {activeTaskStatus.status && (
                            <div className="img-container">
                                {activeTaskStatus.status === 'dangerous' ? (
                                    <img src={theme.img.dangerous} alt="dangerous" />
                                ) : (
                                    <img src={theme.img.critical} alt="critical" />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="task__header--right">
                        <div className="img-container img-click">
                            <img src={theme.img.close.x1} 
                                 srcSet={`${theme.img.close.x1} 1x, ${theme.img.close.x2} 2x`}
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
                <TaskBtns />
            </>
        ) : (
            <EmptyScreen />
        )}
        </ContentScreen>
    );
};

export default TaskActive;