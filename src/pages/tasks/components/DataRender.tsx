import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"
import { useQuery } from "@tanstack/react-query"
import { getTasksByStatus } from "@api"
import { Dropdown, Empty, MenuProps, Spin } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { TReturn } from "src/api/getTasksByStatus"
import DragIcon from "@assets/svg/drag_icon.svg?react"
import CheckMark from "@assets/svg/checkmark.svg?react"
import Checkbox from "antd/es/checkbox/Checkbox"
import classNames from "classnames"
import { Select } from "@components"
import AddEditModal, {
  status
} from "@component/filter-bar/add-task/AddEditModal"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import useFilter from "@store/filter"
import { MenuInfo } from "rc-menu/lib/interface"
import { useToggle } from "@hooks/useToggle"

const DataRender = (props: TProps) => {
  const { type, setCount } = props
  const [open, toggle] = useToggle()

  const taskCategory = useFilter(d => d.taskCategory)
  const search = useFilter(d => d.search)
  const dueOn = useFilter(d => d.dueOn)
  const [taskId, setTaskId] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", type, taskCategory, search, dueOn],
    queryFn: () => getTasksByStatus(type, { dueOn, search, taskCategory })
  })

  const [tasks, setTasks] = useState<TReturn[]>([])

  useEffect(() => {
    setTasks(data ?? [])
    setCount(s => ({ ...s, [type]: tasks.length ?? 0 }))
  }, [data, tasks.length])

  const handleSort = (newOrder: TReturn[]) => {
    setTasks(newOrder)
  }

  const items: MenuProps["items"] = [
    {
      key: "EDIT",
      label: "Edit",
      icon: <EditOutlined />
    },
    {
      key: "DELETE",
      label: "Delete",
      danger: true,
      icon: <DeleteOutlined />
    }
  ]

  const handleEdit = (e: MenuInfo, id: string) => {
    console.log(e.key, id)
    if (e.key == "EDIT") {
      toggle(true)
      return setTaskId(id)
    }
  }
  return (
    <Spin spinning={isLoading}>
      {!!tasks.length ? (
        <ReactSortable
          tag="div"
          list={tasks}
          setList={handleSort}
          handle=".drag-handle"
          animation={200}
          className="space-y-2"
        >
          {tasks.map(item => (
            <Wrapper
              key={item.id}
              className="min-h-[3rem] border-b border-b-gray-400 last:border-b-0 "
            >
              <ColSpanTwo>
                <div className="items-center flex gap-2">
                  <Checkbox />
                  <CheckMark
                    className={classNames({
                      "text-[#1B8D17]": type == "COMPLETED",
                      "text-gray-400": type != "COMPLETED"
                    })}
                  />
                  <span className=" drag-handle cursor-grab ">
                    <DragIcon className=" text-gray-500" />
                  </span>
                  <span
                    className={classNames({
                      "line-through": type == "COMPLETED"
                    })}
                  >
                    {item.taskName}
                  </span>
                </div>
              </ColSpanTwo>
              <ColSpanOne>{dayjs(item.dueOn).format("MM-DD-YYYY")}</ColSpanOne>
              <ColSpanOne>
                <Select
                  options={status}
                  value={item.taskStatus}
                  suffixIcon={null}
                  variant="filled"
                  className="min-w-[8rem]"
                />
              </ColSpanOne>
              <ColSpanTwo>{item.taskCategory}</ColSpanTwo>
              <ColSpanOne className="justify-items-end">
                <Dropdown
                  menu={{
                    items,
                    onClick: e => handleEdit(e, item.id)
                  }}
                  placement="bottomRight"
                >
                  <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                </Dropdown>
              </ColSpanOne>
            </Wrapper>
          ))}
        </ReactSortable>
      ) : (
        <Empty />
      )}

      <AddEditModal taskId={taskId} show={open} toggle={toggle} />
    </Spin>
  )
}

export default DataRender

type TType = "TODO" | "IN-PROGRESS" | "COMPLETED"
type TProps = {
  type: TType
  setCount: React.Dispatch<React.SetStateAction<Record<TType, number>>>
}
