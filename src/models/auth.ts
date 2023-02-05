import { createModel } from "@rematch/core";
import axios from "axios";
import { REST_API } from "../constants";
import { UserAuth, UserController } from "../controller/user.controller";
import { AuthFormLoginValue, IAuthEntity } from "../types/auth.type";
import { RootModel } from "./rootModels";

type params = { [key: string]: any };

interface IAuthState {
    is_authenticated: boolean;
    access_token: string | null;
    status: number | null;
}

const authState: IAuthState = {
    is_authenticated: false,
    access_token: null,
    status: null,
};

interface ILoginResponse {
    access_token: string;
    usr: string;
    nombre: string;
    legajo: string;

}

const userController = new UserController()


export const auth = createModel<RootModel>()({
    state: {
      ...userController.getData(),
    },
    effects: (dispatch) => ({
    
      login: async (params: AuthFormLoginValue) : Promise<IAuthEntity | null> => {
        let userData : IAuthEntity | null = null
        try {
            const response = await axios.post(`${REST_API}/auth/signin`, 
                { usuario: params.username, password: params.password }
            );

            if( response.status === 200 ) {
                userData = {
                    access_token: response.data.access_token,
                    usr: response.data.usr,
                    nombre: response.data.nombre,
                    legajo: response.data.legajo,
                    id: response.data.id,
                    account_type: response.data.account_type,
                    password: ''
                }


            } else if ( response.status === 401 ) {
                console.log('Error');
            }
            return userData

        } catch (error) {
            console.log("auth error server : ", error);
            return null
        }
      },
      logout: async () => {
        await axios.post(`${REST_API}/auth/signout`);
        dispatch({ type: 'RESET_APP' })
      },
    }),
    reducers: {
      // set(state: IAuthState, params: ILookup<any>) {
      //   Object.keys(params).forEach((key) => (state[key] = params[key]));
      //   return state;
      // },
      setUser(state, payload: Partial<UserAuth>) {
        userController.setData({ ...state, ...payload })
        return { ...userController.getData() }
      },
      // reset(state: IAuthState) {
      //   state = authState;
      //   return state;
      // },
    },
  });