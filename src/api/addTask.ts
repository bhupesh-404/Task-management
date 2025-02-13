import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import { TTask } from "@type/task.type"
import { notification } from "antd"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const db = getFirestore()

export const addTask = async (
  task: TTask,
  file?: string | ArrayBuffer | null
) => {
  try {
    const taskData = { ...task, attachment: file || null }
    await addDoc(collection(db, "tasks"), taskData)
    console.log("Task added successfully!")

    await syncFirestoreToAlgolia()
  } catch (error: any) {
    console.error("Error adding task:", error)
    if (error.name == "ApiError") return
    notification.error({ message: error.message })
  }
}
