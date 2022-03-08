import { UPLOAD_FILE } from "../Actions/FileUpload/Type";

const initialState = {
    fileData: []
}

const fileReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case UPLOAD_FILE:
            return {
                ...state,
                fileData: payload
            }
        default:
            return state
    }
}

export default fileReducer