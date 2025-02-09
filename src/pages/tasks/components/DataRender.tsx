import Wrapper from "./Wrapper"
import ColSpanTwo from "./ColSpanTwo"
import ColSpanOne from "./ColSpanOne"

const DataRender = (props: TProps) => {
  const { type } = props
  console.log(type)
  return (
    <div>
      <Wrapper>
        <ColSpanTwo>Datas</ColSpanTwo>
        <ColSpanOne>Data</ColSpanOne>
        <ColSpanOne>Data</ColSpanOne>
        <ColSpanTwo>Datas</ColSpanTwo>
      </Wrapper>
    </div>
  )
}

export default DataRender

type TProps = {
  type: "TODO" | "IN-PROGRESS" | "COMPLETED"
}
