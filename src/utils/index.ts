import { getUserData } from "@api"

export { logOut, signInWithGoogle } from "./auth/signInWithGoogle"
export { encrypt, decrypt } from "./encryptionDecryptionService"
export { debounce } from "./debounce"
export { base64ToFile } from "./base64ToFile"

export const getLoggedInEmail = () => getUserData()?.email
