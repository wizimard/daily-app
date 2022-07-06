import * as userActionCreator from "./UserActionCreator";
import * as entryActionCreator from './EntryActionCreator';

const ActionCreator = {
    ...userActionCreator,
    ...entryActionCreator
};

export default ActionCreator;