import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore
} from "firebase/firestore"

export const logTaskHistory = async (
  taskId: string,
  message: string,
  action: string,
  changedBy: string,
  extraData: any = {}
) => {
  const historyRef = collection(getFirestore(), "tasks", taskId, "taskHistory")
  return await addDoc(historyRef, {
    action,
    message,
    changedBy,
    timestamp: serverTimestamp(),
    ...extraData
  })
}
