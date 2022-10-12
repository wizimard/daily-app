import React, { useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { InputCheckbox, TextareaElement } from "../../ui";

import { useAppDispatch } from "../../hooks/redux";
import { addTaskToDo, 
    changeContentTaskTodo, 
    changeStatusTaskTodo, 
    deleteTaskTodo } from "../../redux/reducers/TaskSlice";

import { ITodo } from "../../models/ITask";

interface TaskToDoProps extends ITodo {
    deepLevel?: number;
}

const TaskToDo:React.FC<TaskToDoProps> = ({ id, content, todos, isDone, deepLevel = 0 }) => {

    const dispatch = useAppDispatch();

    const { theme } = useContext(ThemeContext);

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
                {(deepLevel < 4 && !!content.trim()) && (
                    <div className="img-container img-click todo__add">
                        <img src={theme.img.add}
                            alt="add"
                            onClick={handlerAddTodo} />
                    </div>
                )}
                <div className="img-container img-click">
                    <img src={theme.img.close}
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