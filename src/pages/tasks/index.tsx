import { Collapse } from "@components"
import DataRender from "./components/DataRender"
import "./styles/index.css"
import Wrapper from "./components/Wrapper"
import ColSpanOne from "./components/ColSpanOne"
import ColSpanTwo from "./components/ColSpanTwo"

const TaskBuddy = () => {
  return (
    <div>
      <Wrapper className="px-4">
        <ColSpanTwo>Task name</ColSpanTwo>
        <ColSpanOne>Due on</ColSpanOne>
        <ColSpanOne>Task Status</ColSpanOne>
        <ColSpanTwo>Task Category</ColSpanTwo>
      </Wrapper>
      <div className="mb-4"></div>
      <Collapse
        expandIconPosition="end"
        className="!bg-[#FAC3FF]"
        items={[
          {
            key: "1",
            label: "Todo(3)",
            children: <DataRender type="TODO" />
          }
        ]}
      />
      <div className="mt-6"></div>
      <Collapse
        items={[
          {
            key: "1",
            label: "In-Progress(3)",
            children: <DataRender type="IN-PROGRESS" />
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
            label: "Completed(3)",
            children: <DataRender type="COMPLETED" />
          }
        ]}
        className="!bg-[#CEFFCC]"
        expandIconPosition="end"
      />
    </div>
  )
}

export default TaskBuddy
