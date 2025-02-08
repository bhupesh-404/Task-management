import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "@lib/firebaseConfig"
import { notification } from "antd"

export const logOut = async () => {
  try {
    await signOut(auth)
    notification.success({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout Error:", error)
    notification.error({ message: "Error in logging out" })
  }
}

export const signInWithGoogle = async () => {
  if (!auth.currentUser) {
    try {
      const result = await signInWithPopup(auth, provider)
      if (!result) return null
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      localStorage.setItem("user", JSON.stringify(result.user))
      location.reload()
      return { token, user }
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
      console.error("Google Sign-In Error:", {
        errorMessage,
        email,
        credential
      })
      if (errorCode === "auth/account-exists-with-different-credential") {
        notification.error({
          message:
            "You have already signed up with a different auth provider for that email."
        })
      } else notification.error({ message: errorMessage })
    }
  } else {
    signOut(auth)
  }
  // signInButton.disabled = true;
}
