import { shallow } from "zustand/shallow"
import { storeWithoutPersistWrapper } from "./helpers/storeCreationWrapper"
import { createWithEqualityFn as create } from "zustand/traditional"

type TBatch = {
  taskIds: string[]
}
const defaultdata: TBatch = {
  taskIds: []
}

const useBatch = create<TBatch>()(
  storeWithoutPersistWrapper(() => defaultdata, {
    devtools: { name: "batch-info", store: "batch-store", enabled: true }
  }),
  shallow
)

export default useBatch

export const updateBatch = (taskId: string) =>
  useBatch.setState(batch => ({ taskIds: [...batch.taskIds, taskId] }))

export const clearAllBatch = () => useBatch.setState(() => ({ taskIds: [] }))
