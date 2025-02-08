import { useNetworkStatus } from "@hooks/useNetworkStatus"
import { Result } from "antd"
import { ReactNode } from "react"

const Offline = ({ children }: { children: ReactNode }) => {
  const isOnline = useNetworkStatus()

  if (isOnline) return children
  return (
    <div className="grid place-items-center h-screen">
      <Result status="warning" title="No internet access. Please reconnect." />
    </div>
  )
}

export default Offline
