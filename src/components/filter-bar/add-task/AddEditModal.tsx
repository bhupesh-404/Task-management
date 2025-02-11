import { DatePicker, Form, notification, Radio, Space } from "antd"
import { Timestamp } from "firebase/firestore"
import TextArea from "antd/es/input/TextArea"
import { Button, Input, Modal, Select } from "@components"
import { addTask, getTaskById, updateTaskById } from "@api"
import dayjs from "dayjs"
import { useForm } from "antd/es/form/Form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import "./style/index.css"
import { useEffect } from "react"
import { TTask } from "@type/task.type"

const AddEditModal = ({ taskId, show, toggle }: TProps) => {
  const [form] = useForm<TTask>()

  const queryClient = useQueryClient()
  const { data, isPending: isFetching } = useQuery({
    queryFn: () => getTaskById(taskId),
    queryKey: ["taskById", taskId],
    enabled: !!taskId
  })

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async (data: any) => {
      if (taskId) return updateTaskById(data, taskId)

      return addTask(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })
  const onClose = () => {
    form.resetFields()
    toggle(false)
  }
  const onSubmit = async (data: any) => {
    await mutateAsync({
      ...data,
      dueOn: dayjs(data.dueOn).format("YYYY-MM-DD"),
      dueOnTimeStamp: Timestamp.fromDate(new Date(data.dueOn))
    })

    if (!isError) {
      notification.success({ message: "Created Successfully" })
      onClose()
      return
    }
    notification.error({ message: error.message })
  }

  useEffect(() => {
    if (!taskId || !data) return

    form.setFields([
      { name: "description", value: data.description },
      { name: "taskCategory", value: data.taskCategory },
      { name: "taskName", value: data.taskName },
      { name: "taskStatus", value: data.taskStatus },
      { name: "dueOn", value: data.dueOn ? dayjs(data.dueOn) : null }
    ])
  }, [show, data, taskId, form])

  return (
    <>
      <Modal
        open={show}
        onCancel={onClose}
        width={800}
        footer={null}
        loading={!!taskId && isFetching}
        centered
        title={
          <div className="text-2xl min-h-[3rem] border-b border-gray-300 mb-4">
            {taskId ? "Edit Task" : "Create Task"}
          </div>
        }
      >
        <Form
          form={form}
          id="task-form"
          onFinish={onSubmit}
          size="large"
          variant="filled"
          layout="vertical"
        >
          <Form.Item name={"taskName"} rules={[{ required: true }]}>
            <Input placeholder="Task title" />
          </Form.Item>
          <Form.Item name={"description"}>
            <TextArea
              count={{
                show: true,
                max: 300
              }}
              placeholder="Description"
            />
            {/* <DescriptionInput /> */}
            {/* <TipTapEditor /> */}
          </Form.Item>
          <div className="grid grid-cols-3 gap-2">
            <Form.Item
              name={"taskCategory"}
              label="Task categork"
              rules={[{ required: true }]}
            >
              <Radio.Group buttonStyle="solid">
                <Space>
                  <Radio.Button value="WORK">Work</Radio.Button>
                  <Radio.Button value="PROFESSIONAL">Professional</Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name={"dueOn"}
              label={"Due on"}
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name={"taskStatus"}
              label="Task Status"
              rules={[{ required: true }]}
            >
              <Select options={status} />
            </Form.Item>
          </div>

          <div>
            <div className="text-end">
              <Button onClick={onClose} className="mr-3 mt-[4rem]">
                Cancel
              </Button>
              <Button type="primary" loading={isPending} htmlType="submit">
                {taskId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default AddEditModal

type TProps = {
  taskId?: string
  show: boolean
  toggle: (value?: boolean) => void
}
export const status = [
  {
    label: "Todo",
    value: "TODO"
  },
  {
    value: "IN-PROGRESS",
    label: "In-progess"
  },
  {
    value: "COMPLETED",
    label: "Completed"
  }
]
