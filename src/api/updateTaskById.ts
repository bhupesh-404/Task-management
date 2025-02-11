import { doc, updateDoc, getFirestore } from "firebase/firestore"
import { notification } from "antd"
import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"

export const updateTaskById = async (data: any, taskId: string) => {
  try {
    const taskRef = doc(getFirestore(), "tasks", taskId)
    await updateDoc(taskRef, data)
    await syncFirestoreToAlgolia()
  } catch (error: any) {
    notification.error({ message: error.message })
  }
}
