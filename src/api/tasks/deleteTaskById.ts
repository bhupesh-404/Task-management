import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import { doc, deleteDoc, getFirestore } from "firebase/firestore"

export const deleteTaskById = async (taskId: string) => {
  try {
    const taskRef = doc(getFirestore(), "tasks", taskId)
    await deleteDoc(taskRef)
    await syncFirestoreToAlgolia()
    console.log(`Task with ID ${taskId} deleted successfully`)
  } catch (error) {
    console.error("Error deleting task:", error)
  }
}
