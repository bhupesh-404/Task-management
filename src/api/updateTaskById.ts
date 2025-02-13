import { doc, updateDoc, getFirestore } from "firebase/firestore"
import { notification } from "antd"
import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"

export const updateTaskById = async (
  data: any,
  taskId: string,
  file?: string | ArrayBuffer | null
) => {
  try {
    const taskData = {
      ...data,
      description: data.description ?? "",
      attachment: file || null
    }
    const taskRef = doc(getFirestore(), "tasks", taskId)
    await updateDoc(taskRef, taskData)
    await syncFirestoreToAlgolia()
  } catch (error: any) {
    if (error.name == "ApiError") return
    notification.error({ message: error.message })
  }
}
