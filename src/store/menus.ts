import { create } from 'zustand';
import { IMenu } from '../hook/types';
import { persist, createJSONStorage } from 'zustand/middleware'

type MenuState = {
    menus: IMenu[];
    addAllMenus: (menus: IMenu[]) => void;
    addMenu: (menu: IMenu) => void;
    removeMenu: (id: number) => void;
};


export const useMenuStore = create(
    persist<MenuState>(
        (set, get) => ({
            menus: [],
            addAllMenus: (menus: IMenu[]) => set((state) => ({ menus: menus })),
            addMenu: (menu: IMenu) => set((state) => ({ menus: [...state.menus, menu] })),
            removeMenu: (id: number) => set((state) => ({ menus: state.menus.filter((menu) => menu.idMenuPersonal !== id) })),
        }),
        {
            name: 'menu-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);