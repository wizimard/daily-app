import { systemConstants } from "../../redux/constants/systemConstants";
import { deleteEntry } from "../../redux/action-creator/EntryActionCreator";
import { deleteTask } from "../../redux/action-creator/TaskActionCreator";

export const functionsSubmitted = function() {
    const value:any = {};

    value[systemConstants.DELETE_ENTRY] = {
        func: deleteEntry,
        redirect: "/diary"
    };
    value[systemConstants.DELETE_TASK] = {
        func: deleteTask,
        redirect: "/task"
    };

    return value;
}();