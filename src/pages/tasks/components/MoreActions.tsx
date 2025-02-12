import { Dropdown, MenuProps, notification, Spin } from "antd"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { MenuInfo } from "rc-menu/lib/interface"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTaskById } from "@api"
import AddEditModal from "@component/filter-bar/add-task/AddEditModal"
import { useToggle } from "@hooks/useToggle"

const MoreActions = ({ taskId }: TProps) => {
  const [open, toggle] = useToggle()

  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })
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

  const handleEdit = async (e: MenuInfo) => {
    if (e.key == "EDIT") {
      toggle(true)
      //   return setTaskId(taskId)
    }
    if (e.key == "DELETE") {
      try {
        await mutateAsync(taskId)
        notification.success({ message: "Task deleted successfully" })
      } catch (_) {
        notification.error({
          message: error?.message ?? "Error in deleting task"
        })
      }
    }
  }

  return (
    <Spin spinning={isPending}>
      <Dropdown
        menu={{
          items,
          onClick: e => handleEdit(e)
        }}
        placement="bottomRight"
      >
        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
      </Dropdown>

      <AddEditModal taskId={taskId} show={open} toggle={toggle} />
    </Spin>
  )
}

export default MoreActions

type TProps = {
  taskId: string
}
