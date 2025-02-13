import { getLoggedInEmail } from "@utils/index"
import { doc, setDoc, getFirestore } from "firebase/firestore"

export const saveUserData = async (displayName: string) => {
  const email = getLoggedInEmail()
  if (!email) return
  try {
    await setDoc(
      doc(getFirestore(), "users", email),
      {
        displayName
      },
      { merge: true }
    )

    console.log("User data stored successfully")
  } catch (error) {
    console.error("Error storing user data:", error)
  }
}
