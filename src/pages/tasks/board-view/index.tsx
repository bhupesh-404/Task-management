import FilterBar from "@component/filter-bar"
import Wrapper from "./Wrapper"

const BoardView = () => {
  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-3 gap-[2rem] min-h-screen ">
        <Wrapper type="TODO" />
        <Wrapper type="IN-PROGRESS" />
        <Wrapper type="COMPLETED" />
      </div>
    </div>
  )
}

export default BoardView
