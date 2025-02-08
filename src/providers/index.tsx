import { ReactNode } from "react"
import { ConfigProvider } from "antd"
import { ErrorBoundary } from "react-error-boundary"
import Error500 from "@components/static/Error500"
import Offline from "@components/static/Offline"

const AppProviders = ({ children }: TProps) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#7B1984" } }}>
      <ErrorBoundary fallback={<Error500 />}>
        <Offline>{children}</Offline>
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export default AppProviders

type TProps = {
  children: ReactNode
}
