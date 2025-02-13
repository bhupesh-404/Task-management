import { Avatar, Popover } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Button } from "@components"
import { logOut } from "@utils/index"
import useUserData from "@store/user"
import { useToggle } from "@hooks/useToggle"
import UserModal from "./UserModal"

const Profile = () => {
  const [open, togglePopup] = useToggle()
  const [openProfile, toggleProfile] = useToggle()

  const name = useUserData(s => s.displayName) ?? "-"

  const onLogout = async () => {
    await logOut()
    togglePopup(false)
  }

  const render = () => {
    return (
      <div className="min-w-[12rem] grid gap-2">
        <Button
          shape="default"
          size="large"
          onClick={() => {
            togglePopup(false)
            toggleProfile(true)
          }}
          type="text"
          icon={<UserOutlined />}
          block
        >
          Profile
        </Button>
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
      trigger={["click"]}
      open={open}
    >
      <div className="cursor-pointer" onClick={() => togglePopup(true)}>
        <Avatar size={36} icon={<UserOutlined />} />
        <span className="ms-1 text-lg text-slate-800">{name}</span>
      </div>

      <UserModal open={openProfile} toggle={toggleProfile} />
    </Popover>
  )
}

export default Profile
