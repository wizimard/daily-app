import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { bindActionCreators } from "redux";

import ActionCreator from "../redux/action-creator";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreator, dispatch);
}