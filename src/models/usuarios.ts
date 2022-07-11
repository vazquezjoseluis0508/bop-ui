import { createModel } from "@rematch/core";
import axios from "axios";
import { REST_API } from "../constants";
import { RootModel } from "./rootModels";

type params = { [key: string]: any };

interface IUsuariosState {
  email?: string; // user.id
  clave?: string;
}

const usuariosState: IUsuariosState = {
  email: undefined,
  clave: undefined,
};

export const usuarios = createModel<RootModel>()({
  state: usuariosState,
  effects: (dispatch) => ({
    async fetch() {
      const { set } = dispatch.usuarios;
      const usuarios = await axios.get(`${REST_API}/usuarios`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTY1NTg3NDE4MH0.mOmlzJ5MYg2-DyiypJFHdZV4mByw_Jxn9_Cik7zbvJ4",
        },
      });
      set({ email: usuarios.data[0].email, clave: usuarios.data[0].clave });
    },
  }),
  reducers: {
    set(state: IUsuariosState, params: ILookup<any>) {
      Object.keys(params).forEach((key) => (state[key] = params[key]));
      return state;
    },
    reset(state: IUsuariosState) {
      state = usuariosState;
      return state;
    },
  },
});
