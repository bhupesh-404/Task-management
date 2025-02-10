import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"
import { useQuery } from "@tanstack/react-query"
import { getTasksByStatus } from "@api"
import { Empty, Spin } from "antd"
import dayjs from "dayjs"
import { useEffect } from "react"
import { useFilter } from "@component/filter-bar"

const DataRender = (props: TProps) => {
  const { type, setCount } = props
  const { data, isLoading } = useQuery({
    queryKey: ["tasks", type],
    queryFn: () => getTasksByStatus(type)
  })
  const { data: filterData } = useFilter()

  const getData = () => {
    return filterData?.length ? filterData : data
  }
  useEffect(() => {
    setCount(s => ({ ...s, [type]: getData()?.length ?? 0 }))
  }, [getData()?.length])

  return (
    <Spin spinning={isLoading}>
      {!!getData()?.length ? (
        getData()?.map(item => {
          return (
            <Wrapper
              key={item.id}
              className="min-h-[3rem] border-b border-b-gray-400 last:border-b-0"
            >
              <ColSpanTwo>{item.taskName}</ColSpanTwo>
              <ColSpanOne>{dayjs(item.dueOn).format("MM-DD-YYYY")}</ColSpanOne>
              <ColSpanOne>{item.taskStatus}</ColSpanOne>
              <ColSpanTwo>{item.taskCategory}</ColSpanTwo>
            </Wrapper>
          )
        })
      ) : (
        <>
          <Empty />
        </>
      )}
    </Spin>
  )
}

export default DataRender

type TType = "TODO" | "IN-PROGRESS" | "COMPLETED"
type TProps = {
  type: TType
  setCount: React.Dispatch<React.SetStateAction<Record<TType, number>>>
}
