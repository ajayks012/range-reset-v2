import { UPLOAD_FILE,DELETE_FILE } from "./Type";

export const uploadFile = (data: any) => {
    return {
      type: UPLOAD_FILE,
      payload:data
    };
  };

  export const deleteFile = () => {
    return {
      type: DELETE_FILE,
    };
  };

