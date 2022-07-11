import React from "react";

import InputCheckbox from "../InputCheckbox";
import TextareaElement from "../TextareaElement";

import { useAppDispatch } from "../../hooks/redux";
import { addTaskToDo, 
    changeContentTaskTodo, 
    changeStatusTaskTodo, 
    deleteTaskTodo } from "../../redux/reducers/TaskSlice";

import { ITodo } from "../../models/ITask";

import CloseBlack1xPng from "../../assets/img/close-black1x.png";
import CloseBlack2xPng from "../../assets/img/close-black2x.png";
import AddBlack1xPng from "../../assets/img/add-black1x.png";
import AddBlack2xPng from "../../assets/img/add-black2x.png";

interface TaskToDoProps extends ITodo {
    deepLevel?: number;
}

const TaskToDo:React.FC<TaskToDoProps> = ({ id, content, todos, isDone, deepLevel = 0 }) => {

    const dispatch = useAppDispatch();

    function handlerOnChangeStatus() {
        dispatch(changeStatusTaskTodo(id));
    }
    function handlerOnChangeContent(value: string) {
        dispatch(changeContentTaskTodo({
            id,
            content: value
        }));
    }
    function handlerAddTodo() {
        dispatch(addTaskToDo(id));
    }
    function handlerDeleteTodo() {
        dispatch(deleteTaskTodo(id));
    }

    const paddingLeft = 10 * deepLevel + 'px';

    return (
        <>
        <div className='todo' style={{paddingLeft}}>
            <div className="todo__status">
                <InputCheckbox isDone={isDone}
                    handlerOnChange={handlerOnChangeStatus} />
            </div>
            <div className="todo__content">
                <TextareaElement value={content}
                    handlerOnSave={handlerOnChangeContent}
                    placeholder="To-do text..." />
            </div>
            <div className="todo__actions">
                {deepLevel < 4 && (
                    <div className="img-container img-click todo__add">
                        <img src={AddBlack1xPng}
                            srcSet={`${AddBlack1xPng} 1x, ${AddBlack2xPng} 2x`}
                            alt="add"
                            onClick={handlerAddTodo} />
                    </div>
                )}
                <div className="img-container img-click">
                    <img src={CloseBlack1xPng}
                        srcSet={`${CloseBlack1xPng} 1x, ${CloseBlack2xPng} 2x`}
                        alt="close"
                        onClick={handlerDeleteTodo} />
                </div>
            </div>
        </div>
        {todos.map((todo, index) => (
            <TaskToDo key={index} {...todo} deepLevel={deepLevel + 1} />
        ))}
        </>
    );
}

export default TaskToDo;