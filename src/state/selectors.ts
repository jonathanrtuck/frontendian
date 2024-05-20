import { File, State } from "./types";
import { ID } from "types";

export const getFilesByApplicationId = (state: State, applicationId: ID) =>
  Object.entries(state.types)
    .filter(([, { application }]) => application === applicationId)
    .reduce(
      (acc: File[], [type]) =>
        acc.concat(state.files.filter((file) => file.type === type)),
      []
    );
