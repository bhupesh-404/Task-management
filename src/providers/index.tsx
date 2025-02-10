import { ReactNode } from "react"
import { ConfigProvider } from "antd"
import { ErrorBoundary } from "react-error-boundary"
import Error500 from "@component/static/Error500"
import Offline from "@component/static/Offline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const AppProviders = ({ children }: TProps) => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#7B1984" } }}>
      <ErrorBoundary fallback={<Error500 />}>
        <Offline>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Offline>
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export default AppProviders

type TProps = {
  children: ReactNode
}
