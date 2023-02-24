import { create } from 'zustand';
import { IMenu } from '../hook/types';
import { persist, createJSONStorage } from 'zustand/middleware'


type authState = {
    token: string | null;
    profile: any;
    isAuth: boolean;
}

type authActions = {
    setToken: (token: string) => void;
    setProfile: (profile: any) => void;
    logout: () => void;
}

export const useAuthStore = create( 
    persist<authState & authActions>(
        (set) => ({
            token: '',
            profile: null,
            isAuth: false,
            setToken: (token: string) => set((state) => ({ 
                token: token,
                isAuth: token ? true : false
            })),
            setProfile: (profile: any) => set((state) => ({profile: profile})),
            logout: () => set((state) => ({
                token: null,
                profile: null,
                isAuth: false
            }))
        }), 
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);


