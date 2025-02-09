import { Outlet } from "react-router"
import { Header, Content, Layout } from "@components"
import Logo from "@assets/svg/logo.svg?react"
import Profile from "./profile"

const RootLayout = () => {
  return (
    <Layout>
      <Header className="flex justify-between items-center !bg-white mt-6">
        <h2 className="text-2xl flex gap-1 font-semibold">
          <Logo className="size-9" />
          TaskBuddy
        </h2>
        <Profile />
      </Header>
      <Content className="px-12 py-5">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default RootLayout
