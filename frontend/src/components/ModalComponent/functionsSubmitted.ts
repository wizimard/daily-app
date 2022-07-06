import { systemConstants } from "../../redux/constants/systemConstants";
import { deleteEntry } from "../../redux/action-creator/EntryActionCreator";

export const functionsSubmitted = function() {
    const value:any = {};
    value[systemConstants.DELETE_ENTRY] = deleteEntry;
    return value;
}();