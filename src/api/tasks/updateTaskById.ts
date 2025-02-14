import { doc, updateDoc, getFirestore } from "firebase/firestore"
import { notification } from "antd"
import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import { logTaskHistory } from "../history/logTaskHistory"
import useUserData from "@store/user"

export const updateTaskById = async (
  data: any,
  taskId: string,
  additional: TAdditional
) => {
  try {
    const {
      file,
      oldStatus,
      newStatus,
      isFileRemoved = false,
      isFileUpdated = false,
      type = "STATUS_UPDATE"
    } = additional

    const taskData =
      type == "UPDATE_ALL"
        ? {
            ...data,
            description: data.description ?? "",
            attachment: file || null
          }
        : data
    const taskRef = doc(getFirestore(), "tasks", taskId)
    await updateDoc(taskRef, taskData)

    if (oldStatus != newStatus) {
      await logTaskHistory(
        taskId,
        `You changed status from ${oldStatus} to ${newStatus}`,
        "StatusUpdated",
        useUserData.getState().displayName ?? "USER"
      )
    } else if (isFileRemoved || isFileUpdated) {
      await logTaskHistory(
        taskId,
        isFileRemoved ? "Attachment removed" : "Attachment updated",
        "AttachmentUpdated",
        useUserData.getState().email ?? "USER"
      )
    } else
      await logTaskHistory(
        taskId,
        "Updated this task",
        "TaskUpdated",
        useUserData.getState().email ?? "USER"
      )
    await syncFirestoreToAlgolia()
  } catch (error: any) {
    if (error.name == "ApiError") return
    notification.error({ message: error.message })
  }
}

type TAdditional = {
  file?: string | ArrayBuffer | null
  oldStatus: string
  newStatus: string
  isFileUpdated?: boolean
  isFileRemoved?: boolean
  type?: "STATUS_UPDATE" | "UPDATE_ALL"
}
