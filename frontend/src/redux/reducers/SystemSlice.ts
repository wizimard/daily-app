import { createSlice, PayloadAction} from "@reduxjs/toolkit";

import { systemConstants } from "../../constants/systemConstants";

interface ModalPropsError {
    message: string;
}
interface ModalPropsSubmit {
    type: string;
    id: string;
    message: string;
}
export type ModalProps = ModalPropsError | ModalPropsSubmit;

interface SystemState {
    status: string;
    modal: {
        isShow: boolean;
        type: string;
        props: ModalProps;
    }
};
const initialState:SystemState = {
    status: "",
    modal: {
        isShow: false,
        type: "",
        props: {
            message: ''
        }
    }
}

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        systemFetch(state) {
            state.status = systemConstants.SYSTEM_LOADING;
        },
        systemFetchSuccess(state) {
            state.status = systemConstants.SYSTEM_OK;
        },
        systemFetchError(state, action: PayloadAction<string>) {
            state.status = systemConstants.SYSTEM_ERROR;

            state.modal = {
                isShow: true,
                type: systemConstants.SYSTEM_MODAL_ERROR,
                props: {
                    message: action.payload
                }
            }
        },
        systemHideModal(state) {
            state.modal.isShow = false;
        },
        systemSubmitModal(state, action: PayloadAction<ModalProps>) {
            state.modal = {
                isShow: true,
                type: systemConstants.SYSTEM_MODAL_SUBMIT,
                props: action.payload
            }
        }
    }
});

export const { systemFetch,
               systemFetchSuccess,
               systemFetchError,
               systemHideModal,
               systemSubmitModal } = systemSlice.actions;

export default systemSlice.reducer;