import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore"

export const getFilteredTasks = async (category: string) => {
  const q = query(
    collection(getFirestore(), "tasks"),
    where("taskCategory", "==", category),
    orderBy("dueOn", "asc")
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
