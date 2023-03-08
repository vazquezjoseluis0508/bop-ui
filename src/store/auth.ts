import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface authState {
  token: string | null
  profile: any
  isAuth: boolean
}

interface authActions {
  setToken: (token: string) => void
  setProfile: (profile: any) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<authState & authActions>(
    (set) => ({
      token: '',
      profile: null,
      isAuth: false,
      setToken: (token: string) => {
        set((state) => ({
          token,
          isAuth: !!token
        }))
      },
      setProfile: (profile: any) => { set((state) => ({ profile })) },
      logout: () => {
        set((state) => ({
          token: null,
          profile: null,
          isAuth: false
        }))
      }
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
