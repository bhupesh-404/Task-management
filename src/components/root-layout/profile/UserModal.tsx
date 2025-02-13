import { getUserData, saveUserData } from "@api"
import { Input, Button } from "@components"
import useUserData, { updateUser } from "@store/user"
import { useMutation } from "@tanstack/react-query"
import { Modal, Form, notification } from "antd"

interface UserModalProps {
  open: boolean
  toggle: (value?: boolean) => void
}

const UserModal: React.FC<UserModalProps> = ({ open, toggle }) => {
  const [form] = Form.useForm()

  const displayName = useUserData(d => d.displayName)
  const email = getUserData()?.email

  const { isPending, mutateAsync } = useMutation({
    mutationFn: saveUserData
  })
  const onClose = () => {
    toggle(false)
    form.resetFields()
  }
  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data.displayName)
      notification.success({ message: "User updated successfully" })
      updateUser({ displayName: data.displayName })
      toggle(false)
    } catch (error) {
      console.log(error)
      notification.error({ message: "Error in updating user name" })
    }
  }
  return (
    <Modal
      title="Edit User"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          loading={isPending}
          type="primary"
          onClick={() => form.submit()}
        >
          Update
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ displayName, userName: email }}
        onFinish={onSubmit}
      >
        <Form.Item label="Username" name="userName">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{ required: true, message: "Display name is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
