import { getTaskHistory } from "@api"
import { useQuery } from "@tanstack/react-query"
import { Empty, Skeleton } from "antd"
import dayjs from "dayjs"

const AuditTrail = ({ taskId }: { taskId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["taskById", "taskhistory", taskId],
    queryFn: () => getTaskHistory(taskId!),
    enabled: !!taskId
  })

  const formattedDate = (seconds?: number) => {
    if (!seconds) return ""
    return dayjs(seconds * 1000).format("MMM D [at] h:mm a")
  }

  if (isPending) return <Skeleton />

  if (!data?.length) return <Empty />

  return (
    <div className="max-h-[80vh] overflow-auto">
      {data.map(item => {
        return (
          <div
            key={item.id}
            className="flex justify-between gap-3 items-center pb-[1.5rem]"
          >
            <span className="text-md text-slate-700 text-wrap">
              {item.message}
            </span>
            <span className="text-slate-400 w-[8.5rem] text-right me-1.5">
              {formattedDate(item?.timestamp?.seconds)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default AuditTrail
