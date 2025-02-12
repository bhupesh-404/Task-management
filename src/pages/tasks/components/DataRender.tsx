import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTasksByStatus, updateTaskById } from "@api"
import { Empty, notification, Spin } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { TReturn } from "src/api/getTasksByStatus"
import DragIcon from "@assets/svg/drag_icon.svg?react"
import CheckMark from "@assets/svg/checkmark.svg?react"
import Checkbox from "antd/es/checkbox/Checkbox"
import classNames from "classnames"
import { Button, Select } from "@components"
import { status } from "@component/filter-bar/add-task/AddEditModal"
import { PlusOutlined } from "@ant-design/icons"
import useFilter from "@store/filter"
import useBatch, { updateBatch } from "@store/batch"
import AddForm from "./AddForm"
import MoreActions from "./MoreActions"

const DataRender = (props: TProps) => {
  const { type, setCount } = props
  const queryClient = useQueryClient()

  const taskCategory = useFilter(d => d.taskCategory)
  const search = useFilter(d => d.search)
  const dueOn = useFilter(d => d.dueOn)
  const sorting = useFilter(d => d.sorting)

  const batchIds = useBatch(d => d.taskIds)

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", type, , sorting, taskCategory, search, dueOn],
    queryFn: () =>
      getTasksByStatus(type, { dueOn, search, taskCategory, sorting })
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

  const updateStatus = async (id: string, value: string) => {
    try {
      await updateStatusApi({ data: { taskStatus: value }, taskId: id })
      notification.success({ message: "Updated successfully" })
    } catch (error) {}
  }

  return (
    <Spin spinning={isLoading || isUpdating}>
      {type == "TODO" && (
        <div className="mb-[1rem] hidden lg:block">
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
                  <span className=" drag-handle cursor-grab hidden lg:block">
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
              <ColSpanOne className="hidden lg:block">
                {dayjs(item.dueOn).format("MM-DD-YYYY")}
              </ColSpanOne>
              <ColSpanOne className="hidden lg:block">
                <Select
                  options={status}
                  value={item.taskStatus}
                  suffixIcon={null}
                  variant="filled"
                  className="min-w-[8rem]"
                  onChange={value => updateStatus(item.id, value)}
                />
              </ColSpanOne>
              <ColSpanTwo className="hidden lg:block">
                {item.taskCategory}
              </ColSpanTwo>
              <ColSpanOne className="justify-items-end hidden lg:block">
                <MoreActions taskId={item.id} />
              </ColSpanOne>
            </Wrapper>
          ))}
        </ReactSortable>
      ) : (
        <Empty />
      )}
    </Spin>
  )
}

export default DataRender

export type TType = "TODO" | "IN-PROGRESS" | "COMPLETED"
type TProps = {
  type: TType
  setCount: React.Dispatch<React.SetStateAction<Record<TType, number>>>
}
