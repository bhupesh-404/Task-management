import { syncFirestoreToAlgolia } from "@lib/firebaseConfig"
import { TTask } from "@type/task.type"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const db = getFirestore()

export const addTask = async (task: TTask) => {
  try {
    await addDoc(collection(db, "tasks"), task)
    console.log("Task added successfully!")
    await syncFirestoreToAlgolia()
  } catch (error) {
    console.error("Error adding task:", error)
  }
}
