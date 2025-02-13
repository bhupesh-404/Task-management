import { doc, getDoc, getFirestore } from "firebase/firestore"

export const getUserData = async (email: string) => {
  if (!email) return null

  try {
    const userDoc = await getDoc(doc(getFirestore(), "users", email))

    if (userDoc.exists()) {
      return userDoc.data()
    } else {
      console.log("User not found")
      return null
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}
