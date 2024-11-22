import { create } from 'zustand'
export type TState = string

const useStore = create<TState>()((...newState)=>({
  
}))

export default useStore