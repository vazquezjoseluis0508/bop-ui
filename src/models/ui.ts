import { createModel } from "@rematch/core";
import axios from "axios";
import { REST_API } from "../constants";
import { RootModel } from "./rootModels";

type params = { [key: string]: any };

interface IUiState {
    error: boolean;
    message: string | null;
}

const uiState: IUiState = {
    error: false,
    message: null,
};



export const ui = createModel<RootModel>()({
    state: uiState,
    effects: (dispatch) => ({
    
    }),
    reducers: {
      set(state: IUiState, params: ILookup<any>) {
        Object.keys(params).forEach((key) => (state[key] = params[key]));
        return state;
      },
      reset(state: IUiState) {
        state = uiState;
        return state;
      },
    },
  });