import { Avatar, Popover } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Button } from "@components"
import { useState } from "react"
import { logOut } from "@utils/index"
import useUserData from "@store/user"

const Profile = () => {
  const [open, setOpen] = useState(false)
  const name = useUserData(s => s.displayName) ?? "-"
  const onLogout = async () => {
    await logOut()
    setOpen(false)
  }
  const render = () => {
    return (
      <div className="min-w-[12rem] grid gap-2">
        {/* <Button shape="default" size="large" type="text" block>
          Profile
        </Button> */}
        <Button
          shape="default"
          size="large"
          type="text"
          icon={<LogoutOutlined />}
          block
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    )
  }
  return (
    <Popover
      arrow={false}
      content={render()}
      placement="bottomRight"
      open={open}
      onOpenChange={open => setOpen(open)}
    >
      <div className="cursor-pointer">
        <Avatar size={36} icon={<UserOutlined />} />
        <span className="ms-1 text-lg text-slate-800">{name}</span>
      </div>
    </Popover>
  )
}

export default Profile
