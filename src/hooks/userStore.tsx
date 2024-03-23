import { create } from "zustand";
;

type UserData = {
  id: number,
  email: string,
  role : 'seller' | 'user' | 'admin'
}

type UserStore = {
  userData: UserData | null,
  setUserData : (data : UserData) => void
}

export const userStore = create<UserStore>((set) => ({
  userData: null,
  setUserData : (data) => set(() => ({userData : data}))
}))

