import { shallow } from "zustand/shallow"
import { storeWithoutPersistWrapper } from "./helpers/storeCreationWrapper"
import { createWithEqualityFn as create } from "zustand/traditional"

export interface TFilter {
  taskCategory?: string
  dueOn?: string[]
  search?: string
  sorting: "asc" | "desc"
}

const defaultdata: TFilter = {
  sorting: "asc"
}

const useFilter = create<TFilter>()(
  storeWithoutPersistWrapper(() => ({ ...defaultdata }), {
    devtools: { name: "filter-info", store: "filter-store", enabled: true }
  }),
  shallow
)

export default useFilter

export const addFilter = (data: string | string[], type: keyof TFilter) =>
  useFilter.setState(() => ({ [type]: data }))
