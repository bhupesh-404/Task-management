import { Collapse } from "@components"
import DataRender from "./components/DataRender"
import "./styles/index.css"
import Wrapper from "./components/Wrapper"
import ColSpanOne from "./components/ColSpanOne"
import ColSpanTwo from "./components/ColSpanTwo"
import FilterBar from "@component/filter-bar"
import { useState } from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import useFilter, { addFilter } from "@store/filter"

const TaskBuddy = () => {
  const [count, setCount] = useState({
    TODO: 0,
    "IN-PROGRESS": 0,
    COMPLETED: 0
  })
  const sortOrder = useFilter(d => d.sorting)

  const handleSorting = () => {
    if (sortOrder == "asc") addFilter("desc", "sorting")
    else addFilter("asc", "sorting")
  }
  return (
    <div>
      <FilterBar />
      <Wrapper className="px-2">
        <ColSpanTwo>Task name</ColSpanTwo>
        <ColSpanOne className="hidden lg:block">
          <span
            onClick={handleSorting}
            className="flex items-center !cursor-pointer gap-2"
          >
            Due on
            {sortOrder === "asc" ? (
              <UpOutlined className="text-gray-500 size-4" />
            ) : (
              <DownOutlined className="text-gray-500 size-4" />
            )}
          </span>
        </ColSpanOne>
        <ColSpanOne className="hidden lg:block">Task Status</ColSpanOne>
        <ColSpanTwo className="hidden lg:block">Task Category</ColSpanTwo>
        <ColSpanOne className="hidden lg:block"></ColSpanOne>
      </Wrapper>
      <div className="mb-4"></div>
      <Collapse
        expandIconPosition="end"
        className="!bg-[#FAC3FF]"
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: `Todo(${count.TODO})`,
            children: <DataRender type="TODO" setCount={setCount} />
          }
        ]}
      />
      <div className="mt-6"></div>
      <Collapse
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: `In-Progress(${count["IN-PROGRESS"]})`,
            children: <DataRender type="IN-PROGRESS" setCount={setCount} />
          }
        ]}
        className="!bg-[#85D9F1]"
        expandIconPosition="end"
      />
      <div className="mt-6"></div>

      <Collapse
        items={[
          {
            key: "1",
            label: `Completed(${count.COMPLETED})`,
            children: <DataRender type="COMPLETED" setCount={setCount} />
          }
        ]}
        className="!bg-[#CEFFCC]"
        defaultActiveKey={["1"]}
        expandIconPosition="end"
      />
    </div>
  )
}

export default TaskBuddy
