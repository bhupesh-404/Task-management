import { getFirestore, collection, getDocs } from "firebase/firestore"

export const getTaskHistory = async (taskId: string) => {
  try {
    const historyRef = collection(
      getFirestore(),
      "tasks",
      taskId,
      "taskHistory"
    )
    const historySnap = await getDocs(historyRef)
    const historyData = historySnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TData

    return historyData.sort(
      (a, b) => b.timestamp?.seconds - a.timestamp?.seconds
    )
  } catch (error) {
    console.log("Error : ", error)
  }
}

type TData = {
  id: string
  action: string
  changedBy: string
  message: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
}[]
