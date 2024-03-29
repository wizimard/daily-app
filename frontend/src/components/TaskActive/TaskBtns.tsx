import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../ui";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { saveTask } from "../../redux/action-creator/TaskActionCreator";
import { setActiveTask } from "../../redux/reducers/TaskSlice";

const TaskBtns:React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const activeTask = useAppSelector(state => state.task.activeTask);
    const isChanged = useAppSelector(state => state.task.isChanged);

    const handlerOnClickSave = () => {
        if (activeTask) {
            const newId = dispatch(saveTask(activeTask));
            
            Promise.resolve(newId).then((id) => {
                !!id && navigate(`/task/${id}`);
            });
        }
    }
    const handlerOnClickCancel = () => {
        activeTask && dispatch(setActiveTask(activeTask.id));
    }

    return (
        <>
        {isChanged && (
            <div className="task__btn-group">
                <Button text="save" onClick={handlerOnClickSave} />
                {activeTask?.id !== "new" && (
                    <Button text="cancel" onClick={handlerOnClickCancel} addedClass="task__btn--cancel" />
                )}
            </div>
        )}
        </>
    );
}

export default TaskBtns;