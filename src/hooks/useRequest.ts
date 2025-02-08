import { notification } from "antd"
import { useState } from "react"

const useRequest = () => {
  const [loading, setLoading] = useState(false)

  const request = async (cb: TCallBack) => {
    try {
      setLoading(true)
      const response = await cb()
      setLoading(false)
      return response
    } catch (error: any) {
      console.log({ error })
      notification.error({
        message:
          error.response.data.message ??
          "Something went wrong, please try again later"
      })
      setLoading(false)
    }
  }

  return [request, loading] as const
}

export { useRequest }

type TCallBack = () => Promise<any>
