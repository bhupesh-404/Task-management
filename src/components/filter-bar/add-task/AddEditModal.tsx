import { DatePicker, Form, notification, Radio, Space } from "antd"
import { Timestamp } from "firebase/firestore"
import TextArea from "antd/es/input/TextArea"
import { Button, Input, Modal, Select } from "@components"
import { addTask, getTaskById, updateTaskById } from "@api"
import dayjs from "dayjs"
import { useForm } from "antd/es/form/Form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import "./style/index.css"
import { useEffect, useState } from "react"
import { TTask } from "@type/task.type"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadFile, UploadProps } from "antd"
import { message, Upload } from "antd"
import AuditTrail from "@component/audit-trail"
import classNames from "classnames"

const { Dragger } = Upload

const AddEditModal = ({ taskId, show, toggle }: TProps) => {
  const [form] = useForm<TTask>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [currentTab, setCurrentTab] = useState("DETAILS")
  const queryClient = useQueryClient()
  const { data, isPending: isFetching } = useQuery({
    queryFn: () => getTaskById(taskId),
    queryKey: ["taskById", taskId, show],
    enabled: !!taskId
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newdata: any) => {
      if (taskId) {
        const file = getAttachment(fileList)
        return updateTaskById(newdata, taskId, {
          file,
          isFileRemoved: data?.attachment ? !file : false,
          isFileUpdated: data?.attachment != file,
          newStatus: newdata?.taskStatus,
          oldStatus: data?.taskStatus!,
          type: "UPDATE_ALL"
        })
      }

      return addTask(newdata, getAttachment(fileList))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
      if (taskId)
        queryClient.invalidateQueries({
          queryKey: ["taskById", "taskhistory", taskId],
          exact: false
        })
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

    notification.success({
      message: taskId
        ? "Task updated successfully"
        : "Task created Successfully"
    })
    onClose()
  }

  const props: UploadProps = {
    name: "file",
    listType: "picture",
    multiple: false,
    accept: "image/*,",
    beforeUpload: file => {
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("You can only upload image files!")
        return false
      }

      return false
    },
    maxCount: 1,
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    }
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
    if (data.attachment) {
      setFileList([
        {
          uid: "-1",
          name: "test2.png",
          status: "done",
          url: data.attachment
        }
      ])
    } else {
      setFileList([])
    }
  }, [show, data, taskId, form])

  return (
    <>
      <Modal
        open={show}
        onCancel={onClose}
        width={1200}
        footer={null}
        loading={!!taskId && isFetching}
        centered
        title={
          <div className="text-2xl min-h-[3rem] border-b border-gray-300 mb-4">
            {taskId ? "Edit Task" : "Create Task"}
          </div>
        }
      >
        <div className="mb-[1.5rem] lg:hidden lg:mb-0">
          <Radio.Group
            value={currentTab}
            onChange={({ target }) => {
              setCurrentTab(target.value)
            }}
            buttonStyle="solid"
            id="customtabs"
            block
          >
            <Radio.Button value="DETAILS">DETAILS</Radio.Button>
            <Radio.Button value="ACTIVITY">ACTIVITY</Radio.Button>
          </Radio.Group>
        </div>
        <div className=" lg:flex lg:justify-between lg:gap-4">
          <div
            className={classNames("flex-1", {
              "hidden lg:block": currentTab == "ACTIVITY"
            })}
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
              </Form.Item>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <Form.Item
                  name={"taskCategory"}
                  label="Task categork"
                  rules={[{ required: true }]}
                >
                  <Radio.Group buttonStyle="solid">
                    <Space>
                      <Radio.Button value="WORK">Work</Radio.Button>
                      <Radio.Button value="PROFESSIONAL">
                        Professional
                      </Radio.Button>
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
              {!!fileList.length && (
                <Upload
                  fileList={fileList}
                  listType="picture-card"
                  onPreview={file => {
                    if ("size" in file) {
                      openBase64InNewTab(file.thumbUrl!)
                    } else openBase64InNewTab(file.url!)
                  }}
                  onChange={file => {
                    setFileList(file.fileList)
                  }}
                ></Upload>
              )}
              {!fileList.length && (
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                  </p>
                </Dragger>
              )}
              <div className="flex justify-end gap-3 mt-7">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" loading={isPending} htmlType="submit">
                  {taskId ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          </div>
          {taskId && (
            <div
              className={classNames(
                " min-h-[20rem]  lg:w-[25rem] lg:max-w-[30rem]",
                {
                  "hidden lg:block": currentTab == "DETAILS"
                }
              )}
            >
              <h2 className="text-xl text-slate-950">Activity</h2>
              <div className="bg-[#F1F1F1] min-h-[80%] rounded p-2">
                <AuditTrail taskId={taskId} />
              </div>
            </div>
          )}
        </div>
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

const openBase64InNewTab = (base64String: string) => {
  const newTab = window.open()
  if (newTab) {
    newTab.document.write(
      `<img src="${base64String}" style="max-width: 100%;" />`
    )
  }
}

const getAttachment = (fileList: any[]) => {
  const file = fileList[0]
  if (!file) return null
  if ("size" in file) {
    return file.thumbUrl
  }
  return file.url
}
