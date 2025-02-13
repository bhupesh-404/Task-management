import { shallow } from "zustand/shallow"
import { storeWithoutPersistWrapper } from "./helpers/storeCreationWrapper"
import { createWithEqualityFn as create } from "zustand/traditional"

type TTask = {
  id: string
  status: string
}
export type TBatch = {
  taskIds: TTask[]
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

export const updateBatch = (taskId: TTask) =>
  useBatch.setState(batch => {
    const isExistingTaskId = batch?.taskIds?.find(d => d.id == taskId.id)
    return {
      taskIds: isExistingTaskId
        ? batch.taskIds.filter(d => d.id != taskId.id)
        : [...batch.taskIds, taskId]
    }
  })

export const clearAllBatch = () => useBatch.setState(() => ({ taskIds: [] }))
