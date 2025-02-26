import { MinusCircleOutlined } from "@ant-design/icons"
import { addTask } from "@api"
import { status } from "@component/filter-bar/add-task/AddEditModal"
import { Button, Input, Select } from "@components"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DatePicker, Form, notification } from "antd"
import { useForm, useWatch } from "antd/es/form/Form"
import dayjs from "dayjs"
import { Timestamp } from "firebase/firestore"
import { ReactNode, useRef } from "react"
import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"

const AddForm = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()
  const [form] = useForm()
  const taskData = useWatch("tasks", form)

  const addTaskRef = useRef<(() => void) | null>(null)

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })
  const onSubmit = async ({ tasks }: any) => {
    const data = tasks[0]
    await mutateAsync({
      ...data,
      dueOn: dayjs(data.dueOn).format("YYYY-MM-DD"),
      dueOnTimeStamp: Timestamp.fromDate(new Date(data.dueOn))
    })

    if (!isError) {
      notification.success({
        message: "Task created Successfully"
      })
      form.resetFields()
      return
    }
    notification.error({ message: error.message })
  }

  return (
    <Form name="add-task" variant="filled" onFinish={onSubmit} form={form}>
      <span
        onClick={() => {
          if (!!taskData?.length) return
          if (addTaskRef.current) addTaskRef.current()
        }}
      >
        {children}
      </span>
      <Form.List
        name="tasks"
        rules={[
          {
            validator: async (_, tasks) => {
              if (!tasks || tasks.length < 1) {
                return Promise.reject(
                  new Error("At least one task is required")
                )
              }
            }
          }
        ]}
      >
        {(fields, { add, remove }) => {
          addTaskRef.current = () =>
            add({
              taskName: "",
              dueOn: null,
              taskStatus: undefined,
              taskCategory: undefined
            })

          return (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Wrapper className="gap-8 py-4">
                  <ColSpanTwo>
                    <Form.Item
                      {...restField}
                      noStyle
                      name={[name, "taskName"]}
                      // label="Task Name"
                      rules={[
                        { required: true, message: "Task name is required" }
                      ]}
                    >
                      <Input placeholder="Enter task name" />
                    </Form.Item>
                  </ColSpanTwo>
                  <ColSpanOne>
                    <Form.Item
                      noStyle
                      {...restField}
                      name={[name, "dueOn"]}
                      // label="Due Date"
                      rules={[
                        { required: true, message: "Due date is required" }
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </ColSpanOne>
                  <ColSpanOne>
                    <Form.Item
                      noStyle
                      {...restField}
                      name={[name, "taskStatus"]}
                      // label="Task Status"
                      rules={[
                        { required: true, message: "Task status is required" }
                      ]}
                    >
                      <Select
                        className="w-full"
                        placeholder="Task status"
                        options={status}
                      />
                    </Form.Item>
                  </ColSpanOne>
                  <ColSpanTwo>
                    <Form.Item
                      noStyle
                      {...restField}
                      name={[name, "taskCategory"]}
                      // label="Task Category"
                      rules={[
                        { required: true, message: "Task category is required" }
                      ]}
                    >
                      <Select
                        placeholder="Task category"
                        className="w-full"
                        options={categoryOption}
                      />
                    </Form.Item>
                  </ColSpanTwo>
                  <ColSpanOne>
                    <Button type="link" onClick={() => remove(name)} danger>
                      <MinusCircleOutlined /> Remove Task
                    </Button>
                  </ColSpanOne>
                </Wrapper>
              ))}
              {/* <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Task
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item> */}
            </>
          )
        }}
      </Form.List>

      {!!taskData?.length && (
        <Form.Item>
          <Button loading={isPending} type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
export default AddForm

const categoryOption = [
  {
    label: "Work",
    value: "WORK"
  },
  {
    label: "Personal",
    value: "PERSONAL"
  }
]
