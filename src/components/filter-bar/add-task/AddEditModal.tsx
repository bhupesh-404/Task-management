import { Button, Input, Modal, Select } from "@components"
import { DatePicker, Form, notification, Radio, Space } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
// import DescriptionInput from "./Description"
import { ReactNode, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTask } from "@api"

// import TipTapEditor from "./Editor"
import "./style/index.css"
import dayjs from "dayjs"

const AddEditModal = ({ children }: { children: ReactNode }) => {
  const [form] = useForm()
  const [show, setShow] = useState(false)
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })
  const onClose = () => {
    form.resetFields()
    setShow(false)
  }
  const onSubmit = async (data: any) => {
    await mutateAsync({
      ...data,
      dueOn: dayjs(data.dueOn).format("YYYY-MM-DD")
    })

    if (!isError) {
      notification.success({ message: "Created Successfully" })
      onClose()
      return
    }
    notification.error({ message: error.message })
  }
  return (
    <>
      <span onClick={() => setShow(true)}>{children}</span>
      <Modal
        open={show}
        onCancel={onClose}
        width={800}
        footer={null}
        centered
        title={
          <div className="text-2xl min-h-[3rem] border-b border-gray-300 mb-4">
            Create Task
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
                Create
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default AddEditModal

const status = [
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
