import { writeBatch, doc, getFirestore } from "firebase/firestore"
import { logTaskHistory } from "../history/logTaskHistory"
import useUserData from "@store/user"
import { TBatch } from "@store/batch"

const db = getFirestore()

export const updateTaskStatusBatch = async (
  taskIds: TBatch["taskIds"],
  options: TBatchOptions
) => {
  const batch = writeBatch(db)
  const { type, newStatus } = options
  const historyLogs: Promise<any>[] = []

  taskIds.forEach(async taskId => {
    const taskRef = doc(db, "tasks", taskId.id)

    if (type != "STATUS_UPDATE") batch.delete(taskRef)
    else {
      batch.update(taskRef, { taskStatus: newStatus })
      const logEntry = logTaskHistory(
        taskId.id,
        `You changed status from ${taskId.status} to ${newStatus} in batch update`,
        "BatchUpdate",
        useUserData.getState().displayName ?? "USER"
      )
      historyLogs.push(logEntry)
    }
  })

  await batch.commit()
  await Promise.all(historyLogs)
}

type TBatchItem =
  | {
      newStatus: string
      type: "STATUS_UPDATE"
    }
  | {
      type: "DELETE"
      newStatus?: never
    }

export type TBatchOptions = TBatchItem
