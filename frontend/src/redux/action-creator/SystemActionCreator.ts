import { ModalProps } from "../reducers/SystemSlice";
import { AppDispatch } from "../store";

export const systemModalSubmit = (props: ModalProps) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemModalSubmit(props));
    } 
}