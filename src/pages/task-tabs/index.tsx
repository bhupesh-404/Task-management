import { BarChartOutlined, MenuOutlined } from "@ant-design/icons"
import TaskBuddy from "@pages/tasks"
import { Tabs, TabsProps } from "antd"
import "./styles/style.css"
import BoardView from "@pages/tasks/board-view"

const TaskTabs = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "List",
      children: <TaskBuddy />,
      icon: <MenuOutlined />
    },
    {
      key: "2",
      label: "Board",
      children: <BoardView />,
      icon: <BarChartOutlined />
    }
  ]

  return <Tabs defaultActiveKey="1" size="large" id="task-tabs" items={items} />
}

export default TaskTabs
