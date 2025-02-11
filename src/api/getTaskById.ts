import { doc, getDoc, getFirestore } from "firebase/firestore"

export const getTaskById = async (taskId?: string) => {
  if (!taskId) return null
  try {
    const docRef = doc(getFirestore(), "tasks", taskId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Task Data:", docSnap.data())
      return docSnap.data() as TReturn
    } else {
      console.log("No such task!")
      return null
    }
  } catch (error) {
    console.error("Error getting task:", error)
  }
}

type TReturn = {
  dueOnTimeStamp: {
    seconds: number
    nanoseconds: number
  }
  description: string
  dueOn: string // YYYY-MM-DD format
  taskStatus: "TODO" | "IN_PROGRESS" | "DONE" // You can expand statuses as needed
  taskName: string
  taskCategory: "PROFESSIONAL" | "PERSONAL" | "OTHER" // Extend as per your categories
}
