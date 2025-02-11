import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"
import { TReturn } from "./getTasksByStatus"

export const getFilteredTasks = async (category: string) => {
  if (!category) return null
  const q = query(
    collection(getFirestore(), "tasks"),
    where("taskCategory", "==", category)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as unknown as TReturn[]
}
