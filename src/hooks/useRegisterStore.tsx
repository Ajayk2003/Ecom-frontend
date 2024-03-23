import { create } from 'zustand'

interface UseRegisterStore {
  data: object
  step: number
  resetStep: () => void
  nextStep: () => void
  prevStep: () => void
}
export const useRegisterStore = create<UseRegisterStore>(set => ({
  data: {},
  step: 1,
  resetStep: () => set(state => ({ step: 1 })),
  nextStep: () => set(state => ({ step: state.step + 1 })),
  prevStep: () => set(state => ({ step: state.step - 1 })),
}))
