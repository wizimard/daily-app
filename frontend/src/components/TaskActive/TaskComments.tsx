import React from "react";

import TextareaElement from "../TextareaElement";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addTaskComment, deleteTaskComment } from "../../redux/reducers/TaskSlice";

import { formatDate } from "../../utils/date";

import CloseBlack1xPng from "../../assets/img/close-black1x.png";
import CloseBlack2xPng from "../../assets/img/close-black2x.png";

const TaskComments:React.FC = () => {

    const dispatch = useAppDispatch();

    const comments = useAppSelector(state => state.task.activeTask?.comments) || [];

    function handlerOnSave(value: string) {
        dispatch(addTaskComment(value));
    }
    function handlerOnDeleteComment(id: string) {
        dispatch(deleteTaskComment(id));
    }

    return (
        <>
            <span className="task__comment--title">Comments</span>
            {comments.map((comment, index) => (
                <div key={index} className="task__comment">
                    <div className="task__comment--header">
                        <span className="task__comment--date">({ comment.date })</span>
                        <div className="img-container img-click">
                            <img src={CloseBlack1xPng}
                                 srcSet={`${CloseBlack1xPng} 1x, ${CloseBlack2xPng} 2x`}
                                 onClick={() => handlerOnDeleteComment(comment.id)}
                                 alt="close" />
                        </div>
                    </div>
                    <p className="task__comment--content">{ comment.content }</p>
                </div>
            ))}
            <div className="task__comment">
                <span className="task__comment--date">({ formatDate() })</span>
                <TextareaElement value=""
                                 handlerOnSave={handlerOnSave}
                                 placeholder="Add a comment..."
                                 isClear={true} />
            </div>
        </>
    );
}

export default TaskComments;