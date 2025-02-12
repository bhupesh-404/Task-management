import { ReactNode } from "react"
import { TType } from "../components/DataRender"
import classNames from "classnames"
import { useQuery } from "@tanstack/react-query"
import useFilter from "@store/filter"
import { getTasksByStatus } from "@api"
import { Empty, Spin } from "antd"
import MoreActions from "../components/MoreActions"
import dayjs from "dayjs"

const Wrapper = (props: TProps) => {
  const { children, type } = props
  // const queryClient = useQueryClient()

  const taskCategory = useFilter(d => d.taskCategory)
  const search = useFilter(d => d.search)
  const dueOn = useFilter(d => d.dueOn)
  const sorting = useFilter(d => d.sorting)

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", type, , sorting, taskCategory, search, dueOn],
    queryFn: () =>
      getTasksByStatus(type, { dueOn, search, taskCategory, sorting })
  })

  const getTitle = () => {
    switch (type) {
      case "TODO":
        return { label: "TO-DO", color: "bg-[#FAC3FF]" }
      case "IN-PROGRESS":
        return { label: "In-PRODRESS", color: "bg-[#85D9F1]" }
      default:
        return { label: "COMPLETED", color: "bg-[#CEFFCC]" }
    }
  }
  return (
    <div className="bg-[#f1f1f1] px-4 rounded-2xl">
      <div className={classNames("p-4 mt-3")}>
        <span className={classNames(getTitle().color, "px-4 py-2 rounded")}>
          {getTitle().label}
          {"  "}
          {data?.length ?? 0}
        </span>
      </div>
      <Spin spinning={isLoading}>
        <div className="px-3 pt-1">
          {!!data?.length ? (
            data?.map(item => {
              return (
                <div
                  key={item.id}
                  className="border border-gray-300 bg-white rounded-2xl my-4 py-3 px-5"
                >
                  <div className="min-h-[4rem] flex justify-between">
                    <span
                      className={classNames("truncate text-xl", {
                        "line-through": type == "COMPLETED"
                      })}
                    >
                      {item.taskName}
                    </span>
                    <MoreActions taskId={item.id} />
                  </div>
                  <div className="flex justify-between mt-8">
                    <span>{item.description}</span>
                    <span>{dayjs(item.dueOn).format("DD-MM-YYYY")}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <Empty />
          )}
          {children}
        </div>
      </Spin>
    </div>
  )
}

export default Wrapper

type TProps = {
  children?: ReactNode

  type: TType
}
