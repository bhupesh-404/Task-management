import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp
} from "firebase/firestore"

const migrateDueOnFields = async () => {
  const db = getFirestore()
  const tasksRef = collection(db, "tasks")
  const snapshot = await getDocs(tasksRef)

  snapshot.forEach(async docSnap => {
    const data = docSnap.data()
    // if (data.dueOnTimeStamp && typeof data.dueOn === "string") {
    const newDueOn = Timestamp.fromDate(new Date(data.dueOn))

    await updateDoc(doc(db, "tasks", docSnap.id), {
      dueOnTimeStamp: newDueOn
    })

    console.log(`Updated task ${docSnap.id} with Timestamp`)
    // }
  })
}

export { migrateDueOnFields }
