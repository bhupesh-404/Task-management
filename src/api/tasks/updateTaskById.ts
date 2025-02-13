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
      isFileUpdated = false
    } = additional
    const taskData = {
      ...data,
      description: data.description ?? "",
      attachment: file || null
    }
    const taskRef = doc(getFirestore(), "tasks", taskId)
    await updateDoc(taskRef, taskData)

    if (oldStatus != newStatus) {
      await logTaskHistory(
        taskId,
        `You changed status from ${oldStatus} to ${newStatus}`,
        "StatusUpdated",
        useUserData.getState().displayName ?? "USER"
      )
    }
    if (isFileRemoved || isFileUpdated) {
      await logTaskHistory(
        taskId,
        isFileUpdated ? "Attachment updated" : "Attachment removed",
        "AttachmentUpdated",
        useUserData.getState().email ?? "USER"
      )
    }
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
}
