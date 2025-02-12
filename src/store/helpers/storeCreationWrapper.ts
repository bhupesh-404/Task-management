import {
  DevtoolsOptions,
  // createJSONStorage,
  devtools
} from "zustand/middleware"
import { StateCreator } from "zustand"
import { persist } from "zustand/middleware"
// import customStorage from "./customStorage"

const storeCreationWrapper = <T>(
  store: StateCreator<T, [["zustand/devtools", never]], []>,
  options: TOptions
) => {
  const { devtools: devtoolsOptions } = options

  return devtools(
    persist(store, {
      name: options.persistName
      // storage: createJSONStorage(() => customStorage)
    }),
    devtoolsOptions
  )
}

export default storeCreationWrapper

type TOptions = {
  persistName: string
  devtools: DevtoolsOptions
}

type TWithoutPersistOptions = {
  devtools: DevtoolsOptions
}

export const storeWithoutPersistWrapper = <T>(
  store: StateCreator<T, [["zustand/devtools", never]], []>,
  options: TWithoutPersistOptions
) => {
  const { devtools: devtoolsOptions } = options

  return devtools(store, devtoolsOptions)
}
