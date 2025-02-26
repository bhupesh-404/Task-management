import { Button, Input, Select } from "@components"
import "./styles/style.css"
import AddEditModal from "./add-task/AddEditModal"
import { SearchOutlined } from "@ant-design/icons"
import { DatePicker } from "antd"
import { addFilter } from "@store/filter"
import { debounce } from "@utils/debounce"
import { useToggle } from "@hooks/useToggle"

const FilterBar = () => {
  const [open, toggle] = useToggle()
  const filterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFilter(e.target.value, "search")
  }
  const onSearch = debounce(filterBySearch, 300)
  return (
    <>
      <div
        id="filter-bar"
        className="min-h-[5rem] flex flex-wrap  gap-4 py-4 justify-between items-center border-b border-gray-300 mb-[1rem]"
      >
        <div>
          <div className="flex flex-[1] flex-wrap items-center lg:flex-none gap-4">
            <span className="text-gray-400">Filter by: </span>
            <Select
              size="large"
              placeholder="Category"
              allowClear
              className="!mx-5 lg:min-w-[8rem]"
              options={categoryOptions}
              onChange={value => {
                addFilter(value, "taskCategory")
              }}
            />
            <DatePicker.RangePicker
              size="large"
              placeholder={["Due on From", "Due on To"]}
              onChange={async (_, date) => {
                addFilter(date, "dueOn")
              }}
            />
          </div>
        </div>
        <div className="flex items-center flex-[1] lg:flex-none gap-3">
          <Input
            className="!rounded-3xl"
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={e => onSearch(e)}
          />
          <Button size="large" type="primary" onClick={() => toggle(true)}>
            Add task
          </Button>
          <AddEditModal show={open} toggle={toggle} />
        </div>
      </div>
    </>
  )
}

export default FilterBar

const categoryOptions = [
  {
    label: "Work",
    value: "WORK"
  },
  {
    label: "Personal",
    value: "PERSONAL"
  }
]
