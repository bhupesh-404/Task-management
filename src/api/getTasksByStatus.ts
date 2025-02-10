import { TTask } from "@type/task.type"
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore
} from "firebase/firestore"

export const getTasksByStatus = async (status: string): Promise<TReturn[]> => {
  const q = query(
    collection(getFirestore(), "tasks"),
    where("taskStatus", "==", status)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as unknown as TReturn[]
}

export type TReturn = TTask & {
  id: string
}
