import { Button, Select } from "@components"
import "./styles/style.css"
import AddEditModal from "./add-task/AddEditModal"
import { createContext, ReactNode, useContext } from "react"
import { TReturn } from "src/api/getTasksByStatus"

const FilterContext = createContext<TFilter>({ data: null, loading: false })
export const useFilter = () => useContext(FilterContext)

const FilterBar = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div
        id="filter-bar"
        className="min-h-[5rem] flex justify-between items-start border-b border-gray-300 mb-[1rem]"
      >
        <div>
          <span className="text-gray-400">Filter by: </span>
          <Select
            size="large"
            placeholder="Category"
            className="!mx-5"
            options={[{ value: "sample", label: <span>sample</span> }]}
          />
          <Select
            size="large"
            placeholder="Due on"
            options={[{ value: "sample", label: <span>sample</span> }]}
          />
        </div>
        <div>
          <AddEditModal>
            <Button size="large" type="primary">
              Add task
            </Button>
          </AddEditModal>
        </div>
      </div>
      {children && (
        <FilterContext.Provider value={{ data: null, loading: false }}>
          {children}
        </FilterContext.Provider>
      )}
    </>
  )
}

export default FilterBar

type TFilter = {
  data: null | TReturn[]
  loading: boolean
}
