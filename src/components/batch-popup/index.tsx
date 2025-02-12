import { notification, Tag } from "antd"
import PopCheckMark from "@assets/svg/tasks_icon.svg?react"
import { Button } from "@component/button"
import "./styles/style.css"
import "antd/dist/reset.css"
import { useToggle } from "@hooks/useToggle"
import { useBatchStatus } from "@hooks/useBatchStatus"
import useBatch, { clearAllBatch } from "@store/batch"
const BatchPopup = () => {
  const [open, toggle] = useToggle()
  const { mutateAsync, isDeleting, isUpdating, isPending, error } =
    useBatchStatus()

  const taskIds = useBatch(d => d.taskIds)

  const onStatusChange = async (status: string) => {
    toggle(false)
    try {
      await mutateAsync({
        taskIds,
        options: { newStatus: status, type: "STATUS_UPDATE" }
      })
      notification.success({ message: "Task status updated successfully" })
      clearAllBatch()
    } catch (_) {
      notification.error({ message: error?.message })
    }
  }

  const onBatchDelete = async () => {
    toggle(false)
    try {
      await mutateAsync({
        taskIds,
        options: { type: "DELETE" }
      })
      notification.success({ message: "Task deleted successfully" })
      clearAllBatch()
    } catch (_) {
      notification.error({ message: error?.message })
    }
  }
  return (
    <div
      id="batch-popup"
      className="w-full max-w-[36rem] md:max-w-[40rem] z-50 absolute bottom-[2rem] left-1/2 transform -translate-x-1/2 p-4 bg-black text-white rounded-2xl"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,auto))]  gap-3 items-center]">
        <div
          style={{ display: "ruby" }}
          className="col-span-full lg:col-span-1"
        >
          <Tag
            className="!p-2 !text-md"
            closable
            onClose={() => {
              if (isPending) return
              clearAllBatch()
            }}
          >
            {taskIds.length} Tasks Selected
          </Tag>
          <PopCheckMark className="!size-[2rem] text-white" />
        </div>
        <div className="!relative col-span-full lg:col-span-1">
          <Button
            size="large"
            block
            onClick={() => toggle()}
            loading={isUpdating}
          >
            Status
          </Button>
          {open && (
            <div className="absolute bottom-full left-0 w-full bg-white text-black rounded-lg shadow-md mb-2">
              {items.map(item => (
                <button
                  key={item.key}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() => {
                    onStatusChange(item.key)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-full lg:col-span-1">
          <Button
            danger
            size="large"
            block
            onClick={() => onBatchDelete()}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BatchPopup
const items = [
  {
    key: "TODO",
    label: "Todo"
  },
  {
    key: "IN-PROGRESS",
    label: "In-progess"
  },
  {
    key: "COMPLETED",
    label: "Completed"
  }
]
