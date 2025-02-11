import { shallow } from "zustand/shallow"
import storeCreationWrapper from "./helpers/storeCreationWrapper"
import { createWithEqualityFn as create } from "zustand/traditional"

export interface TFilter {
  taskCategory?: string
  dueOn?: string[]
  search?: string
}

const defaultdata: TFilter = {}

const useFilter = create<TFilter>()(
  storeCreationWrapper(() => ({ ...defaultdata }), {
    persistName: "Filter",
    devtools: { name: "filter-info", store: "filter-store", enabled: true }
  }),
  shallow
)

export default useFilter

export const addFilter = (data: string | string[], type: keyof TFilter) =>
  useFilter.setState(() => ({ [type]: data }))
