import { writeBatch, doc, getFirestore } from "firebase/firestore"

const db = getFirestore()

export const updateTaskStatusBatch = async (
  taskIds: string[],
  options: TBatchOptions
) => {
  const batch = writeBatch(db)
  const { type, newStatus } = options
  taskIds.forEach(taskId => {
    const taskRef = doc(db, "tasks", taskId)
    if (type == "STATUS_UPDATE")
      batch.update(taskRef, { taskStatus: newStatus })
    else batch.delete(taskRef)
  })

  await batch.commit()
}

export type TBatchOptions =
  | {
      newStatus: string
      type: "STATUS_UPDATE"
    }
  | {
      type: "DELETE"
      newStatus?: never
    }
