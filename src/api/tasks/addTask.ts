import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import { TTask } from "@type/task.type"
import { notification } from "antd"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { logTaskHistory } from "./logTaskHistory"
import useUserData from "@store/user"

const db = getFirestore()

export const addTask = async (
  task: TTask,
  file?: string | ArrayBuffer | null
) => {
  try {
    const taskData = { ...task, attachment: file || null }
    const taskResponse = await addDoc(collection(db, "tasks"), taskData)
    console.log("Task added successfully!")
    await logTaskHistory(
      taskResponse.id,
      "You created this task",
      "Created",
      useUserData.getState().displayName! ?? "USER"
    )
    await syncFirestoreToAlgolia()
  } catch (error: any) {
    console.error("Error adding task:", error)
    if (error.name == "ApiError") return
    notification.error({ message: error.message })
  }
}
