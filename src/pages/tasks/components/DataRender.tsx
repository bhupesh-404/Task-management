import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteTaskById, getTasksByStatus, updateTaskById } from "@api"
import { Dropdown, Empty, MenuProps, notification, Spin } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { TReturn } from "src/api/getTasksByStatus"
import DragIcon from "@assets/svg/drag_icon.svg?react"
import CheckMark from "@assets/svg/checkmark.svg?react"
import Checkbox from "antd/es/checkbox/Checkbox"
import classNames from "classnames"
import { Button, Select } from "@components"
import AddEditModal, {
  status
} from "@component/filter-bar/add-task/AddEditModal"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import useFilter from "@store/filter"
import { MenuInfo } from "rc-menu/lib/interface"
import { useToggle } from "@hooks/useToggle"
import useBatch, { updateBatch } from "@store/batch"
import AddForm from "./AddForm"

const DataRender = (props: TProps) => {
  const { type, setCount } = props
  const [open, toggle] = useToggle()
  const queryClient = useQueryClient()

  const taskCategory = useFilter(d => d.taskCategory)
  const search = useFilter(d => d.search)
  const dueOn = useFilter(d => d.dueOn)
  const sorting = useFilter(d => d.sorting)

  const [taskId, setTaskId] = useState("")

  const batchIds = useBatch(d => d.taskIds)

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", type, , sorting, taskCategory, search, dueOn],
    queryFn: () =>
      getTasksByStatus(type, { dueOn, search, taskCategory, sorting })
  })
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })
  const { mutateAsync: updateStatusApi, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, taskId }: { data: any; taskId: string }) =>
      updateTaskById(data, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
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

  const handleEdit = async (e: MenuInfo, id: string) => {
    if (e.key == "EDIT") {
      toggle(true)
      return setTaskId(id)
    }
    if (e.key == "DELETE") {
      try {
        await mutateAsync(id)
        notification.success({ message: "Task deleted successfully" })
      } catch (_) {
        notification.error({
          message: error?.message ?? "Error in deleting task"
        })
      }
    }
  }

  const updateStatus = async (id: string, value: string) => {
    try {
      await updateStatusApi({ data: { taskStatus: value }, taskId: id })
      notification.success({ message: "Updated successfully" })
    } catch (error) {}
  }

  return (
    <Spin spinning={isLoading || isPending || isUpdating}>
      {type == "TODO" && (
        <div className="mb-[1rem]">
          <AddForm>
            <Button type="text" icon={<PlusOutlined />}>
              Add Item
            </Button>
          </AddForm>
        </div>
      )}
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
                  <Checkbox
                    onChange={() => updateBatch(item.id)}
                    checked={batchIds.includes(item.id)}
                  />
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
                  onChange={value => updateStatus(item.id, value)}
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
